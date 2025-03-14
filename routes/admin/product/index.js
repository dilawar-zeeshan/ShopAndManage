import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../controllers/admin/product/index.js";

router.route("/create").post(createProduct);
router.route("/delete/:productId").delete(deleteProduct);
router.route("/update/:productId").patch(updateProduct);

export default router;
