import createCafeRules from "./create-cafe";
import getCafesPaginatedRules from "./get-cafes-paginated";
import getCafeRules from "./get-cafe";
import updateCafeRules from "./update-cafe";

export default Object.freeze({
  getCafeRules,
  createCafeRules,
  getCafesPaginatedRules,
  updateCafeRules,
});

export { getCafeRules, createCafeRules, getCafesPaginatedRules, updateCafeRules };
