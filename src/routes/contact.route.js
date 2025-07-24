import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createContact,
  getAllContacts,
  deleteContact,
  createEmail,
  getAllEmail,
  createBrochure,
  getAllBrochure,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);
router.route("/email").post(createEmail);
router.route("/brochure").post(createBrochure);


router.route("/get-all").get(
  // verifyJwt,
  getAllContacts
);
router.route("/get-all-brochure").get(
  // verifyJwt,
  getAllBrochure
);
router.route("/get-all-emails").get(
  getAllEmail
);
router.route("/delete").get(
  // verifyJwt,
  deleteContact
);

export default router;
