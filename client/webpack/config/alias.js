/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
import {join} from 'path';

import {rootDir} from '../utils/env';

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@assets': join(rootDir, '/src/assets'),
  '@styles': join(rootDir, '/src/styles'),
  '@pages': join(rootDir, '/src/pages'),
  '@layouts': join(rootDir, '/src/layouts'),
  '@components': join(rootDir, '/src/components'),
};
