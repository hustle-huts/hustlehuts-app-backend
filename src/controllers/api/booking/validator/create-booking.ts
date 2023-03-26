const createBookingRules = {
  slots: "required|array",
  "slots.*.date": "required|string",
  "slots.*.time": "required|array",
  "slots.*.time.*": "required|string",
  "slots.*.timezone": "required|string",
  "slots.*.seat": "required|integer",
};

export default createBookingRules;
