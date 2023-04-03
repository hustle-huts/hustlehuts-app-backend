import { Request, Response } from "express";
import { logger } from "../configs/logs";

type IController = (httpRequest: any) => any;

export default function makeExpressViewCallback(controller: IController) {
  return (req: Request, res: Response) => {
    const httpRequest = {
      context: {
        validated: Object.assign({}, req.body, req.params, req.query),
        user: req.user,
      },
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      host: req.get("host"),
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
        const body = response.body.file ? response.body.file : response.body;
        res.status(response.statusCode).send(body);
      })
      .catch((error: any) => {
        logger.error("More information ", error.body);
        res.status(500).send(error.body);
      });
  };
}
