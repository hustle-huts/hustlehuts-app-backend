import mongoose from "mongoose";

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    mongoose.set("strictQuery", true);
    console.log("Setting up database...");
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }
  return mongoose;
}

export function makeDatabaseURL(): string {
  let DATABASE_URL = process.env.DATABASE_URL || "";
  if (process.env.NODE_ENV === "test") {
    DATABASE_URL = process.env.TEST_DATABASE_URL || "";
  }
  return DATABASE_URL;
}

export function makeDatabaseOptions() {
  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  };
  return options;
}

export default makeDb;
