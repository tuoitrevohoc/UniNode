/// <reference path="./cross-spawn.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const ts = require('typescript');
const path = require('path');
const fs = require('fs-extra');
const ws = require("ws");
const http = require("http");
const watch_1 = require("watch");
const fs_extra_1 = require("fs-extra");
const spawn = require("cross-spawn");
let config = require("../webpack.config");
const compileOptions = {
    "sourceMap": true,
    "module": ts.ModuleKind.CommonJS,
    "target": ts.ScriptTarget.ES6,
    "jsx": ts.JsxEmit.React,
    "noImplicitAny": false
};
/**
 * Check if a node is exported
 * @param node the node to check
 */
function isExportNode(node) {
    return ((node.flags & ts.NodeFlags.Export) !== 0) &&
        (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
}
/**
 * compile typescript
 *
 */
function compileClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign(compileOptions);
        console.log("Compiling");
        fs.copySync("./application", "dist/application");
        fs.copySync("./public", "./dist/public");
        generateServices(options);
        compileCode();
    });
}
/**
 * Compile client code
 */
function compileCode() {
    const result = spawn.sync("webpack");
    if (result && result.stdout) {
        console.log(result.stdout.toString());
    }
    if (result && result.stderr) {
        console.log(result.stderr.toString());
    }
    fs.removeSync("./dist/application");
}
/**
 * generate services from options
 * @param options
 */
function generateServices(options) {
    const entries = config.entry;
    for (const entryName in entries) {
        const entry = entries[entryName];
        const program = ts.createProgram(entry, options);
        const typeChecker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            const dirName = path.dirname(sourceFile.path);
            if (dirName.endsWith("/services")) {
                processService(sourceFile);
            }
        }
        /**
         * Process Service File
         * @param sourceFile the source file to process
         */
        function processService(sourceFile) {
            /**
             * the service file
             */
            let serviceFile = {
                imports: [
                    "import {invoke} from \"../common/network/RemoteService\";"
                ],
                classes: [],
            };
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, node => {
                if (isExportNode(node)) {
                    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                        const classDeclaration = node;
                        const symbol = typeChecker.getSymbolAtLocation(classDeclaration.name);
                        let classDefinition = {
                            name: symbol.name,
                            methods: []
                        };
                        serviceFile.classes.push(classDefinition);
                        if (symbol.members) {
                            for (const memberName in symbol.members) {
                                const member = symbol.members[memberName];
                                if ((member.flags & ts.SymbolFlags.Method) !== 0) {
                                    const methodDeclaration = member.valueDeclaration;
                                    const signature = typeChecker.getSignatureFromDeclaration(methodDeclaration);
                                    const method = {
                                        name: member.name,
                                        parameters: signature.parameters.map((parameter) => ({
                                            name: parameter.getName(),
                                            type: typeChecker.typeToString(typeChecker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration))
                                        })),
                                        returnType: typeChecker.typeToString(signature.getReturnType())
                                    };
                                    classDefinition.methods.push(method);
                                }
                            }
                        }
                    }
                }
                else if (node.kind === ts.SyntaxKind.ImportDeclaration) {
                    const importDeclaration = node;
                    const text = importDeclaration.getText(sourceFile);
                    const from = importDeclaration.moduleSpecifier.getText(sourceFile);
                    if (!from.match(new RegExp("/\/server\//"))) {
                        serviceFile.imports.push(text);
                    }
                }
            });
            let content = serviceFile.imports.join("\n") + "\n";
            content += serviceFile.classes.map(classDeclaration => {
                let classText = "export class " + classDeclaration.name + " {\n";
                classText += classDeclaration.methods.map(method => {
                    let methodText = "\tasync " + method.name + "(" + method.parameters.map(parameter => parameter.name + ": " + parameter.type).join(",") + "): " + method.returnType + " {\n";
                    methodText += "\t\treturn invoke(\"" + classDeclaration.name + "\", \"" + method.name +
                        "\", Array.from(arguments));\n";
                    methodText += "\t}\n";
                    return methodText;
                }).join("\n");
                classText += "}";
                return classText;
            }).join("\n\n");
            fs.writeFileSync(sourceFile.path, content);
        }
    }
}
/**
 * Compile server code
 * @param outDir the server
 */
function compileServer(outDir = "./dist/server") {
    const options = Object.assign(compileOptions);
    options["outDir"] = outDir;
    options["moduleResolution"] = ts.ModuleResolutionKind.NodeJs;
    const program = ts.createProgram(["application/ServerApplication.ts"], options);
    program.emit();
}
/**
 * build the application
 */
function build() {
    compileServer();
    compileClient();
}
/**
 * list of sockets
 */
const sockets = [];
/**
 * live reload server
 */
function startLiveReloadServer() {
    const reloadJs = fs.readFileSync(__dirname + "/scripts/reload.js");
    /// create live reload server
    const server = http.createServer(function (request, response) {
        response.write(reloadJs);
        response.end();
    });
    const wsServer = new ws.Server({
        server
    });
    wsServer.on("connection", (socket) => {
        sockets.push(socket);
        socket.on("close", () => {
            // remove on disconnect
            const index = sockets.indexOf(socket);
            if (index >= 0) {
                sockets.splice(index, 1);
            }
        });
    });
    server.listen(3001, () => {
        console.log("Live Reload server online");
    });
}
/**
 * run node express server
 * @return {ChildProcess}
 */
function runServer() {
    let serverProcess = spawn("node", ["./dist/server/ServerApplication.js"]);
    serverProcess.stdout.on("data", (data) => {
        if (data) {
            console.log(data.toString());
        }
    });
    serverProcess.stderr.on("data", (data) => {
        if (data) {
            console.log(data.toString());
        }
    });
    return serverProcess;
}
/**
 * Reload all pages
 */
function sendMessage(message = "reload") {
    for (const socket of sockets) {
        socket.send(message);
    }
}
/**
 * watch for rebuild
 */
function watch() {
    /// start server
    let serverProcess = runServer();
    /// build if file in application folder changed
    watch_1.watchTree("./application", (f, curr, prev) => {
        if (typeof f == "object" && prev === null && curr === null) {
            console.log("Watcher is online");
        }
        else {
            if (f.endsWith("ts")) {
                sendMessage("reloading");
                console.log("File changed ");
                console.log("Stop server...");
                serverProcess.kill();
                build();
                console.log("Start server...");
                serverProcess = runServer();
                setTimeout(function () {
                    sendMessage();
                }, 1000);
            }
            else {
                sendMessage("reloading");
                compileClient();
                sendMessage();
                console.log("reloaded..");
            }
        }
    });
    watch_1.watchTree("./public/styles", (f, curr, prev) => {
        if (typeof f == "object" && prev === null && curr === null) {
            console.log("Style watcher is online");
        }
        else {
            if (f.endsWith("css")) {
                sendMessage("reloading");
                console.log("style changed..");
                fs_extra_1.copySync("./public/styles", "./dist/public/styles");
                sendMessage("reload-css");
                console.log("reloaded..");
            }
        }
    });
    startLiveReloadServer();
}
build();
watch();
//# sourceMappingURL=main.js.map