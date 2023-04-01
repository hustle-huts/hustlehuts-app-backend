const updateUserRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  first_name: "string",
  last_name: "string",
  telegram_handle: "string",
  password: "string|min:8",
};

export default updateUserRules;
