const updateCafeRules = {
  _id: "required|regex:/^[0-9a-fA-F]{24}$/i",
  name: "string",
  address: "string",
  open_at: "string",
  close_at: "string",
  availability_time_slots: "array",
  "availability_time_slots.*.date": "string",
  "availability_time_slots.*.time": "array",
  "availability_time_slots.*.time.*": "string",
  "availability_time_slots.*.timezone": "string",
  "availability_time_slots.*.seat": "integer",
  credit: "integer",
};

export default updateCafeRules;
