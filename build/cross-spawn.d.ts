declare module "cross-spawn" {

    interface Spawn extends Function {
        sync(command: string);
    }

    const spawn: Spawn;

    export = spawn;
}