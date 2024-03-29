import { join } from "path";

import CopyPlugin from "copy-webpack-plugin";

import { rootDir } from "../utils/env";

const config = {
  patterns: [
    { from: join(rootDir, "./public/assets"), to: "static/assets" },
    { from: join(rootDir, "./src/assets"), to: "./assets" },
  ],
};

export const copyPlugin = new CopyPlugin(config);
