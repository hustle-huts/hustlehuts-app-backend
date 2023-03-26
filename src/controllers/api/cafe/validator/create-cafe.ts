const createCafeRules = {
  name: "required|string",
  address: "required|string",
  open_at: "required|string",
  close_at: "required|string",
  availability_time_slots: "required|array",
  "availability_time_slots.*.date": "required|string",
  "availability_time_slots.*.time": "required|array",
  "availability_time_slots.*.time.*": "required|string",
  "availability_time_slots.*.timezone": "required|string",
  "availability_time_slots.*.seat": "required|integer",
  credit: "integer",
};

export default createCafeRules;
