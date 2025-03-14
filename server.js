import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import AdminRoutes from "./routes/admin/admin_routes.js";
import connectDB from "./config/db.js";
import SharedRoutes from "./routes/shared/shared_routes.js";

dotenv.config();
connectDB();
const port = process.env.PORT;

const server = http.createServer(app);
AdminRoutes(app);
SharedRoutes(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
