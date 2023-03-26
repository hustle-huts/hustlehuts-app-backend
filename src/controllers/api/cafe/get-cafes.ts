import { cafeService } from "../../../services";

/**
 * @description Get cafes
 * @function getCafesController
 */
async function getCafesController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const cafes = await cafeService.findAll();

    return {
      headers,
      statusCode: 200,
      body: {
        data: cafes,
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

export default getCafesController;
