import createCafeRules from "./create-cafe";
import getCafesPaginatedRules from "./get-cafes-paginated";
import getCafeRules from "./get-cafe";
import updateCafeRules from "./update-cafe";
import getCafesByQueryRules from "./get-cafes-by-query";

export default Object.freeze({
  getCafeRules,
  createCafeRules,
  getCafesPaginatedRules,
  updateCafeRules,
  getCafesByQueryRules,
});

export { getCafeRules, createCafeRules, getCafesPaginatedRules, updateCafeRules, getCafesByQueryRules };
