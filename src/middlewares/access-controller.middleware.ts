import { Request, Response, NextFunction } from "express";
import _ from "lodash";

export default function accessControlMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Website you wish to allow to connect
  const origin = getAccessControlAllowOrigin(req);
  res.setHeader("Access-Control-Allow-Origin", origin);
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Origin,Accept,Authorization,X-Requested-With");
  // Pass to next layer of middleware
  next();
}

function getAccessControlAllowOrigin(req: Request): string {
  const allowed_origins = [
    "https://app-staging.hustlehuts.com",
    "https://app.hustlehuts.com",
    "https://hustlehuts.com",
    "https://admin.hustlehuts.com",
    "http://localhost:8082",
  ];
  const origin = String(_.get(req, "headers.origin"));
  const is_allowed = allowed_origins.includes(origin);

  if (is_allowed) {
    return origin;
  }

  if (process.env.ACCESS_CONTROL_ALLOW_ORIGIN) {
    const access_control_allow_origin_array = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(",");
    let first_allowed_origin = "";
    const is_allowed = access_control_allow_origin_array.some((allowed_origin) => {
      const origin_allowed = allowed_origin.includes(origin) || allowed_origin === "*";
      if (origin_allowed) {
        first_allowed_origin = allowed_origin;
      }

      return origin_allowed;
    });

    if (is_allowed) {
      return first_allowed_origin;
    }
  }

  return process.env.NODE_ENV === "production" ? "https://app.hustlehuts.com" : "http://localhost:8082";
}
