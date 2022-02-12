const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
      main: "./src/client/js/main.js", 
      videoPlayer: "./src/client/js/videoPlayer.js",
      recorder: "./src/client/js/recorder.js",
    },
    plugins: [new MiniCssExtractPlugin({ //css와 분리(번들화)
      filename: "css/styles.css",
    })],
    mode: "development",
    watch: true,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "output"),
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [["@babel/preset-env", { targets: "defaults" }]],
              },
            },
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            //실행순서: scass-loader, css-loader, style-loader
          },
        ],
    },
};