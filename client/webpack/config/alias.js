/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
import { join } from "path";

import { rootDir } from "../utils/env";

export const aliasItems = {
  "@app": join(rootDir, "/src/1app"),
  "@processes": join(rootDir, "/src/2processes"),
  "@pages": join(rootDir, "/src/3pages"),
  "@widgets": join(rootDir, "/src/4widgets"),
  "@features": join(rootDir, "/src/5features"),
  "@entities": join(rootDir, "/src/6entities"),
  "@shared": join(rootDir, "/src/7shared"),
};
