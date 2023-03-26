import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";
import { getCafeRules, getCafesPaginatedRules } from "../../controllers/api/cafe/validator";
import { getCafeController, getCafesPaginatedController } from "../../controllers/api/cafe";

import tokenValidatorMiddleware from "../../middlewares/token-validator-middleware";

const cafeRouter = express.Router();

cafeRouter.get(
  "/",
  makeValidator(getCafesPaginatedRules),
  tokenValidatorMiddleware,
  makeExpressCallback(getCafesPaginatedController),
);
cafeRouter.get(
  "/:cafe_id",
  makeValidator(getCafeRules),
  tokenValidatorMiddleware,
  makeExpressCallback(getCafeController),
);

export default cafeRouter;
