import _ from "lodash";
import moment from "moment-timezone";
import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    // TODO: Change if only there's request to support multiple opening hours
    open_at: { type: String, required: true }, // Assuming that the cafe opens at same time everyday
    close_at: { type: String, required: true }, // Assuming that the cafe closes at same time everyday
    credit: { type: Number, default: 0 },
    has_wifi: { type: Boolean, default: false },
    has_charging: { type: Boolean, default: false },
    has_ambience: { type: Boolean, default: false },
    image_url: { type: String },
    availability_time_slots: [
      {
        date: { type: String, trim: true, default: null },
        time: [{ type: String, trim: true, default: [] }],
        seat: { type: Number },
      },
    ],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, default: 0 }, // TODO: Implement rating schema, might change to virtual getter instead
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

/* It's a virtual getter that returns true if the cafe is open, false otherwise. */
cafeSchema.virtual("is_open").get(function () {
  const open_at = _.get(this, "open_at");
  const close_at = _.get(this, "close_at");
  const open_at_moment = moment.tz(open_at, "HH:mm", "Asia/Singapore");
  const close_at_moment = moment.tz(close_at, "HH:mm", "Asia/Singapore");
  const now = moment.tz("Asia/Singapore");
  return now.isBetween(close_at_moment, open_at_moment);
});

cafeSchema.plugin(mongooseLeanVirtuals);

export default cafeSchema;
