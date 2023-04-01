import mongoose from "mongoose";

const accessTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    user_id: { type: String, required: true },
    user_type: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    revoked: { type: Boolean, default: false },
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

export default accessTokenSchema;
