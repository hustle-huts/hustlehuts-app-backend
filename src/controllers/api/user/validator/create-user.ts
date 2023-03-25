const createUserRules = {
  display_name: "required|string",
  email: "required|email",
  password: "required|string|min:8|confirmed",
};

export default createUserRules;
