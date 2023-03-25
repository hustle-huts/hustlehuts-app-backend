const updateUserRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  display_name: "string",
  password: "string|min:8|confirmed",
};

export default updateUserRules;
