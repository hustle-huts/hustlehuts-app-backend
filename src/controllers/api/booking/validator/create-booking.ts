const createBookingRules = {
  cafe: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  slots: "required|array",
  "slots.*.date": "required|string",
  "slots.*.time": "required|array",
  "slots.*.time.*": "required|string",
  "slots.*.timezone": "required|string",
  "slots.*.seat": "required|integer",
};

export default createBookingRules;
