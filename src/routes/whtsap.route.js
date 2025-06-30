import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createWhtsap, getAllWhatsapp } from "../controllers/whatsap.controller.js";

const router = Router();

router.route("/create").post(createWhtsap);

router.route("/get-all-whatsapp").get(getAllWhatsapp);

export default router;
