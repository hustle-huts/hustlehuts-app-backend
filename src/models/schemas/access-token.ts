import mongoose from "mongoose";

const Schema = mongoose.Schema;
const accessTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    user_id: { type: String, required: true },
    user_role: {
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
