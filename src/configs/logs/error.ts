import winston from "winston";
import expressWinston from "express-winston";

export default function makeErrorLogger() {
  return expressWinston.errorLogger({
    transports: [new winston.transports.Console({ level: "warn" })],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: "Error {{ req.clientIp }} {{req.method}} {{req.url}} {{res.statusCode}}",
  });
}
