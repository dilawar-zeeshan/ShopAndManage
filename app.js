import express from "express";
import morgan from "morgan";

const app = express();
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

app.use(express.json());
app.use(
  express.json({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(morgan("dev"));
export default app;
