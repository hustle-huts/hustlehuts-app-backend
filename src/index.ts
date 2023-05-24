import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./configs/logs";
import makeDb from "./configs/make-db";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";
import multer from "multer";
import fileUploadMiddleware from "./middlewares/file-upload.middleware";
import { cafeService } from "./services";
import { createSampleData } from "./utils/createSampleData";
import swaggerRouter from "./routes/swagger";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(corsOptions));
app.use(upload.single("file"));
app.use(fileUploadMiddleware);
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "test") {
  app.use(makeLogger());
}
app.use(swaggerRouter);

makeDb().then(async () => {
  const cafes = await cafeService.findAll();
  if (cafes.length === 0) {
    await createSampleData();
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/api", apiRouter);
app.use("/admin", adminRouter);
app.get("/", function (req, res) {
  res.send("HustleHuts App Backend is running");
});

export default app;
