import winston from "winston";
import expressWinston from "express-winston";

export default function makeLogger() {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
        level: "verbose",
      }),
    ],
    format: formatLog(),
    meta: false,
    msg: `HTTP {{ req.clientIp }} {{req.method}} {{req.url}} {{res.statusCode}} {{res.error}} {{res.responseTime}}ms`,
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    metaField: null,
    level: "http",
    statusLevels: false,
    ignoreRoute: (req, res) => {
      return req.url === "/";
    },
  });
}

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  level: "verbose",
  format: formatLog(),
});

function formatLog() {
  return winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((entry) => {
      let message = entry.message;
      if (message && typeof message === "object") {
        message = JSON.stringify(message);
      }
      return `${entry.timestamp} [${entry.level}]: ${message}`;
    }),
    winston.format.simple(),
    winston.format.align(),
    winston.format.metadata(),
  );
}
