import { userService } from "../../../services";
/**
 * @description Get all users records
 * @function getUsersController
 */
async function getUsersController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const users = await userService.findAll();
    return {
      headers,
      statusCode: 200,
      body: {
        data: users,
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

export default getUsersController;
