import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
    slots: [
      {
        date: { type: String, trim: true, default: null },
        time: [{ type: String, trim: true, default: [] }],
        timezone: { type: String, trim: true, default: "Asia/Singapore" },
        seat: { type: Number },
      },
    ],
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

export default bookingSchema;
