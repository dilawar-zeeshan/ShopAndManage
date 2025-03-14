import Product from "./product/index.js";
import Order from "./order/index.js";
import Admin from "./auth/index.js";

const AdminRoutes = (app) => {
  //Admin Auth Routes

  app.use("/api/admin/product", Product);
  app.use("/api/admin/order", Order);
  app.use("/api/auth/admin", Admin);
};

export default AdminRoutes;
