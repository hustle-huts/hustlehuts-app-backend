import _ from "lodash";

import ICafe from "../../../models/interfaces/cafe.interface";
import { cafeService } from "../../../services";
import { IFile } from "../../../middlewares/file-upload.middleware";

/**
 * @description Create new cafe record in database
 * @function createCafeController
 */
async function createCafeController(httpRequest: Request & { context: { validated: ICafe; locals: { file: IFile } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const cafeDetails: ICafe = _.get(httpRequest, "context.validated");
    const { cid, fileName }: { cid: string; fileName: string } = _.get(httpRequest, "context.locals.file");
    if (!cid || !fileName) {
      throw new Error(`No image found.`);
    }

    const image_url = `https://w3s.link/ipfs/${cid}`;
    cafeDetails["image_url"] = image_url;
    const created_cafe = await cafeService.insert(cafeDetails);
    if (!created_cafe) {
      throw new Error(`Cafe was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_cafe,
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}

export default createCafeController;
