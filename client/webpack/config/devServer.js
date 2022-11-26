import path from 'path';

export const devServerConfig = {
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  historyApiFallback: true,
  hot: true,
  static: {
    // publicPath: path.join(__dirname, '/'),

    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    directory: path.resolve(process.cwd(), 'public'),
    publicPath: ['/'],
  },
  // devMiddleware: {
  //   // It is important to tell WebpackDevServer to use the same "publicPath" path as
  //   // we specified in the webpack config. When homepage is '.', default to serving
  //   // from the root.
  //   // remove last slash so user can land on `/test` instead of `/test/`
  //   publicPath: '/',
  // },
  host: 'localhost',
  port: 3000,
};
