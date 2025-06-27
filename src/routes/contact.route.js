import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createContact,
  getAllContacts,
  deleteContact,
  createWhtsap,
  getAllWhatsapp,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);
router.route("/whatsp").post(createWhtsap);
router.route("/get-all").get(
  // verifyJwt,
  getAllContacts
);
router.route("/get-all-whatsapp").get(
  getAllWhatsapp
);
router.route("/delete").get(
  // verifyJwt,
  deleteContact
);

export default router;
