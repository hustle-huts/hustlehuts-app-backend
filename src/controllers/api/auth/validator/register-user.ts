const createUserRules = {
  first_name: "required|string",
  last_name: "required|string",
  email: "required|email",
  password: "required|string|min:8|confirmed",
};

export default createUserRules;
