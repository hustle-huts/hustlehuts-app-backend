import _ from "lodash";
import moment from "moment-timezone";
import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import NodeGeocoder from "node-geocoder";

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] },
    },
    opening_hours: {
      monday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      tuesday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      wednesday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      thursday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      friday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      saturday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
      sunday: { open_at: { type: String, required: true }, close_at: { type: String, required: true } },
    },
    credit: { type: Number, default: 0 },
    has_wifi: { type: Boolean, default: false },
    has_charging: { type: Boolean, default: false },
    has_ambience: { type: Boolean, default: false },
    image_url: { type: String },
    availability_time_slots: [
      {
        date: { type: String, trim: true, default: null },
        time: [{ type: String, trim: true, default: [] }],
        seat: [{ type: Number, default: [] }],
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

// Define a pre-save hook that geocodes the cafe's formatted address and updates its location field
cafeSchema.pre("save", async function () {
  // Use NodeGeocoder to geocode the cafe's formatted address
  const geocoder = NodeGeocoder({
    provider: "google",
    apiKey: process.env.GOOGLE_MAPS_API_KEY, // Replace with your own Google Maps API key
  });

  const address = _.get(this, "address");
  try {
    const [res] = await geocoder.geocode(address);
    if (!res) {
      throw Error("Unable to geocode address");
    }

    const longitude: number = _.get(res, "longitude", 0);
    const latitude: number = _.get(res, "latitude", 0);
    // Update the cafe's location field with the latitude and longitude
    (this.location as any) = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  } catch (error) {
    console.error(error);
  }
});

/* It's a virtual getter that returns true if the cafe is open, false otherwise. */
cafeSchema.virtual("is_open").get(function () {
  const open_at = _.get(this, "open_at");
  const close_at = _.get(this, "close_at");
  const open_at_moment = moment.tz(open_at, "HH:mm", "Asia/Singapore");
  const close_at_moment = moment.tz(close_at, "HH:mm", "Asia/Singapore");
  const now = moment.tz("Asia/Singapore");
  return now.isBetween(close_at_moment, open_at_moment);
});

cafeSchema.index({ location: "2dsphere" });

cafeSchema.plugin(mongooseLeanVirtuals);

export default cafeSchema;
