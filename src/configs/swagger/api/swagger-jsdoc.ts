import swaggerJsDoc from "swagger-jsdoc";

const is_production = process.env.NODE_ENV === "production";
const api_route = is_production ? "build/routes/api/*.js" : "src/routes/api/*.ts";
const documentation_route = is_production
  ? "build/configs/swagger/schemas/*.yaml"
  : "src/configs/swagger/schemas/*.yaml";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HustleHuts App Backend Documentation",
      description: "You can find all the APIs available",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [api_route, documentation_route], // files containing annotations as above
};

const swagger_specifications = swaggerJsDoc(options);

export default swagger_specifications;
