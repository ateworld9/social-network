import path from "path";

export const devServerConfig = {
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
  historyApiFallback: true,
  // hot: true,
  static: {
    // publicPath: path.join(__dirname, '/'),

    directory: path.resolve(process.cwd(), "public"),
    publicPath: ["/"],
  },
  devMiddleware: {
    // It is important to tell WebpackDevServer to use the same "publicPath" path as
    // we specified in the webpack config. When homepage is '.', default to serving
    // from the root.
    // remove last slash so user can land on `/test` instead of `/test/`
    publicPath: "/",
  },
  host: "localhost",
  port: 3000,
};
