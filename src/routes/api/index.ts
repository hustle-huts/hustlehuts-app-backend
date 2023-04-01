import express from "express";
import userRouter from "./user.route";
import cafeRouter from "./cafe.route";
import bookingRouter from "./booking.route";

const router = express.Router();

router.use("/user", userRouter);
router.use("/cafe", cafeRouter);
router.use("/booking", bookingRouter);

export default router;
