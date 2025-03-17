import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = e();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    origin: true,
  })
);

app.use(e.json({ limit: "16kb" }));
app.use(e.urlencoded({ extended: true, limit: "16kb" }));
app.use(e.static("public"));
app.use(cookieParser());

//routes import
// import adminRouter from "./routes/admin.route.js";
// import propertyRouter from "./routes/property.route.js";

//routes declaration
// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/property", propertyRouter);

export default app;
