module.exports = {
    entry: {
        app: ['babel-polyfill', 'whatwg-fetch', "./dist/application/Application.tsx"]
    },
    output: {
        path: "./dist/public/application",
        publicPath: "/dist/public/application",
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "redux": "Redux"
    }
};