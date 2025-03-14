import express from "express";
const router = express.Router();

import {
  deleteOrder,
  getAllOrder,
  updateOrder,
} from "../../../controllers/admin/order/index.js";
import { adminAuth } from "../../../middlewares/adminAuth.js";

router.route("/all").get(adminAuth, getAllOrder);
router.route("/delete/:orderId").delete(deleteOrder);
router.route("/update/:orderId").patch(updateOrder);

export default router;
