import pino from 'pino';
import pretty from 'pino-pretty';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const logger = pino(
  {
    customLevels: levels,
    useOnlyCustomLevels: true,
    level: 'http',
  },
  process.env.NODE_ENV === 'development'
    ? pretty({
        colorize: true, // colorizes the log
        levelFirst: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      })
    : pino.destination(`${__dirname}/logger.log`),
);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;

// import winston from 'winston';

// const options: winston.LoggerOptions = {
//   transports: [
//     new winston.transports.Console({
//       level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
//     }),
//     new winston.transports.File({filename: 'debug.log', level: 'debug'}),
//   ],
// };

// const logger = winston.createLogger(options);

// export default logger;
