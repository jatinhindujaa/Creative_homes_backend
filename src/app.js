// import e from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// dotenv.config();

// const app = e();
// app.use(e.json({ limit: "25mb" }));
// app.use(e.urlencoded({ extended: true, limit: "25mb" }));
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//     origin: true,
//   })
// );

// app.use(e.static("public"));
// app.use(cookieParser());

// // import adminRouter from "./routes/admin.route.js";
// import propertyRouter from "./routes/property.route.js";
// import agentRouter from "./routes/agent.route.js";
// import contactRouter from "./routes/contact.route.js";
// import listRouter from "./routes/listproperty.route.js";
// import newsRouter from "./routes/news.route.js";
// import teamRouter from "./routes/team.route.js";
// import offplanRouter from "./routes/offplan.route.js";
// import areaRouter from "./routes/areas.route.js";
// import whtsapRouter from "./routes/whtsap.route.js";
// import adminRouter from "./routes/admin.route.js";





// //routes declaration
// // app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/property", propertyRouter);
// app.use("/api/v1/agent", agentRouter);
// app.use("/api/v1/contact", contactRouter);
// app.use("/api/v1/listyourproperty", listRouter);
// app.use("/api/v1/news", newsRouter);
// app.use("/api/v1/team", teamRouter);
// app.use("/api/v1/offplan", offplanRouter);
// app.use("/api/v1/area", areaRouter);
// app.use("/api/v1/whtsap", whtsapRouter);




// export default app;



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Add this CORS config BEFORE any routes
const allowedOrigins = [
  "http://localhost:3000", // for development
  "https://creativehomes.ae", // for production, if any
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman) or whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you're sending cookies or auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight OPTIONS requests globally
app.options("*", cors());

// Other middlewares
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import propertyRouter from "./routes/property.route.js";
import agentRouter from "./routes/agent.route.js";
import contactRouter from "./routes/contact.route.js";
import listRouter from "./routes/listproperty.route.js";
import newsRouter from "./routes/news.route.js";
import teamRouter from "./routes/team.route.js";
import offplanRouter from "./routes/offplan.route.js";
import areaRouter from "./routes/areas.route.js";
import whtsapRouter from "./routes/whtsap.route.js";
import adminRouter from "./routes/admin.route.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/listyourproperty", listRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/offplan", offplanRouter);
app.use("/api/v1/area", areaRouter);
app.use("/api/v1/whtsap", whtsapRouter);

export default app;
