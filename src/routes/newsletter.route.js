import { Router } from "express";
import { createEmail, getAllEmail } from "../controllers/newsletter.controller.js";

const router = Router();

router.route("/create").post(createEmail);

router.route("/get-all-newsletter").get(getAllEmail);

export default router;
