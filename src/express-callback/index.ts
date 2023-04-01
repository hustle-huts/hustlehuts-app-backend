import { Request, Response, NextFunction } from "express";

type IController = (httpRequest: any) => any;

export default function makeExpressCallback(controller: IController) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      context: {
        validated: Object.assign({}, req.body, req.params, req.query),
        user: req.user,
        file: req.file,
        locals: res.locals,
      },
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((response: any) => {
        if (response.headers) {
          res.set(response.headers);
        }
        res.type("json");
        res.status(response.statusCode).send(response.body);
      })
      .catch((error: any) => {
        console.error("Error encountered: ", error.body);
        res.status(error.statusCode).send(error.body);
        next(error);
      });
  };
}
