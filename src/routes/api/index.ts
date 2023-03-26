import express from "express";
import userRouter from "./user";
import cafeRouter from "./cafe";
import bookingRouter from "./booking";

const router = express.Router();

router.use("/user", userRouter);
router.use("/cafe", cafeRouter);
router.use("/booking", bookingRouter);

export default router;
