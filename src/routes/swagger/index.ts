import express from "express";
import swaggerUI from "../../configs/swagger/swagger-ui";
import swagger_specifications from "../../configs/swagger/api/swagger-jsdoc";

const swaggerRouter = express.Router();

swaggerRouter.use(
  "/api/swagger",
  swaggerUI.serveFiles(swagger_specifications),
  swaggerUI.setup(swagger_specifications),
);

/**
 * Used to get the JSON version of the swagger files
 */
swaggerRouter.get("/api/swagger/swagger.json", (req, res) => res.json(swagger_specifications));

export default swaggerRouter;
