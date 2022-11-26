import fs from 'fs';
import path from 'path';

import {aliasItems, externalItems} from './config';
import entry from './entry';
import optimization from './optimization';
import * as plugins from './plugins';
import * as rules from './rules';
import {isDevServer, isProd} from './utils/env';
import {arrayFilterEmpty} from './utils/helpers';




export default {
  context: __dirname,
  target: isDevServer ? 'web' : ['web', 'es5'],
  mode: isProd ? 'production' : 'development',
  entry,
  output: {
    path: path.join(__dirname, '../build'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isDevServer,
    publicPath: '/',
    filename: isDevServer
      ? 'static/js/[name].[fullhash].js'
      : 'static/js/[name].[contenthash].js',
    // assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  module: {
    rules: arrayFilterEmpty([
      rules.javascriptRule,
      rules.typescriptRule,
      rules.htmlRule,
      rules.imagesRule,
      rules.fontsRule,
      rules.cssRule,
      ...rules.lessRules,
      ...rules.sassRules,
      ...rules.svgRules,
    ]),
  },
  plugins: arrayFilterEmpty([
    plugins.htmlWebpackPlugin,
    // plugins.InlineChunkHtml,
    plugins.providePlugin,
    plugins.definePlugin,
    plugins.forkTsCheckerWebpackPlugin,
    plugins.esLintPlugin,
    // plugins.copyPlugin,
  ]),
  resolve: {
    alias: aliasItems,
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimization,
  externals: externalItems,
};
