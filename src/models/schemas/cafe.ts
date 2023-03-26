import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    open_at: { type: String, required: true },
    close_at: { type: String, required: true },
    availability_time_slots: [
      {
        date: { type: String, trim: true, default: null },
        time: [{ type: String, trim: true, default: [] }],
        timezone: { type: String, trim: true, default: "Asia/Singapore" },
        seat: { type: Number },
      },
    ],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    credit: { type: Number, default: 0 },
    image_url: { type: String },
    deleted_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    autoCreate: true,
  },
);

export default cafeSchema;
