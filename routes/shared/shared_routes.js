import Order from "./order/index.js";
import Product from "./product/index.js";

const SharedRoutes = (app) => {
  //Admin Auth Routes

  app.use("/api/shared/product", Product);
  app.use("/api/shared/order", Order);
};

export default SharedRoutes;
