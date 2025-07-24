import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = e();
app.use(e.json({ limit: "25mb" }));
app.use(e.urlencoded({ extended: true, limit: "25mb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    origin: true,
  })
);

app.use(e.static("public"));
app.use(cookieParser());

import propertyRouter from "./routes/property.route.js";
import agentRouter from "./routes/agent.route.js";
import contactRouter from "./routes/contact.route.js";
import listRouter from "./routes/listproperty.route.js";
import newsRouter from "./routes/news.route.js";
import teamRouter from "./routes/team.route.js";
import offplanRouter from "./routes/offplan.route.js";
import areaRouter from "./routes/areas.route.js";
import whtsapRouter from "./routes/whtsap.route.js";
import newsletterRouter from "./routes/newsletter.route.js";
import adminRouter from "./routes/admin.route.js";
import brochureRouter from "./routes/brochure.route.js";
import openingRouter from "./routes/opening.route.js";
import careerRouter from "./routes/career.route.js";



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
app.use("/api/v1/newsletter", newsletterRouter);
app.use("/api/v1/brochure", brochureRouter);
app.use("/api/v1/openings", openingRouter);
app.use("/api/v1/careers", careerRouter);






export default app;
