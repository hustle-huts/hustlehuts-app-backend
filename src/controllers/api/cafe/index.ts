import createCafeController from "./create-cafe";
import getCafeController from "./get-cafe";
import updateCafeController from "./update-cafe";
import getCafesController from "./get-cafes";
import getCafesPaginatedController from "./get-cafes-paginated";

const cafeController = Object.freeze({
  createCafeController,
  getCafeController,
  updateCafeController,
  getCafesController,
  getCafesPaginatedController,
});

export default cafeController;

export {
  createCafeController,
  getCafeController,
  updateCafeController,
  getCafesController,
  getCafesPaginatedController,
};
