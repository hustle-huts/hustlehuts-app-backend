import { Request, Response, NextFunction } from "express";
import { Web3Storage } from "web3.storage";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

export interface IFile {
  cid: string;
  fileName: string;
}

export default async function fileUploadMiddleware(req: Request & { file?: any }, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    if (!file) {
      return next();
    }

    const buffer = file.buffer;
    const fileName = file.originalname;

    // upload file to web3.storage
    const cid = await client.put([buffer]);
    res.locals.file = { cid, fileName } as IFile;

    next();
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "File upload failed" });
  }
}
