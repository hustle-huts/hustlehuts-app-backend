import { Request, Response, NextFunction } from "express";
import passport from "../configs/passport";
import IUser from "../models/interfaces/user.interface";

export default function authenticateUserMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("user-jwt", { session: false }, function (err: any, user: IUser, _info: any) {
    if (err) {
      return res.status(401).send("Access Denied");
    }

    if (!user) {
      return res.status(401).send("Access Denied");
    }

    req.user = user;
    next();
  })(req, res, next);
}
