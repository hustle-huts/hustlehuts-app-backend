import createCafeController from "./create-cafe";
import getCafeController from "./get-cafe";
import updateCafeController from "./update-cafe";
import getCafesController from "./get-cafes";
import getCafesPaginatedController from "./get-cafes-paginated";
import getCafesByQueryController from "./get-cafes-by-query";

const cafeController = Object.freeze({
  createCafeController,
  getCafeController,
  updateCafeController,
  getCafesController,
  getCafesPaginatedController,
  getCafesByQueryController,
});

export default cafeController;

export {
  createCafeController,
  getCafeController,
  updateCafeController,
  getCafesController,
  getCafesPaginatedController,
  getCafesByQueryController,
};
