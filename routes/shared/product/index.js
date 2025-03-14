import express from "express";
import { getAllProduct } from "../../../controllers/shared/product/index.js";
const router = express.Router();

router.route("/all").get(getAllProduct);
export default router;
