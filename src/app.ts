import express from "express";
import cors from "cors";

import routes from "./routes/index";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log("CORS allowed origin:", env.FRONTEND_URL);
  return next();
});
app.use(express.json());
app.use("/api", routes);

export default app;
