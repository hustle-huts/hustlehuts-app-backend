import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash_password: { type: String },
    phone_number: { type: String },
    telegram_handle: { type: String },
    type: { type: String, required: true, enum: ["cafe", "customer"], default: "customer" },
    provider: { type: String, required: true, enum: ["email", "google", "facebook"], default: "email" },
    provider_meta: { type: Object },
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

export default userSchema;
