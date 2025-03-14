import express from "express";
import {
  createOrder,
  getOrderStatus,
} from "../../../controllers/shared/order/index.js";

const router = express.Router();
router.route("/create").post(createOrder);
router.route("/status/:statusId").get(getOrderStatus);

export default router;
