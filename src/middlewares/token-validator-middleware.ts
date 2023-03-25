import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { accessTokenService } from "../services";

export default async function (req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "AUTH_SECRET");
    if (verified) {
      const user_id = await accessTokenService.findUserId({ token });
      req.body.user_id = user_id;
      next();
    }
  } catch (err) {
    await accessTokenService.revokeByToken({ token });
    res.status(400).send("Invalid Token");
  }
}
