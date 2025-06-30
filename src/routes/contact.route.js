import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createContact,
  getAllContacts,
  deleteContact,
  createEmail,
  getAllEmail,
  createBrousher,
  getAllBrousher,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);
router.route("/email").post(createEmail);
router.route("/brousher").post(createBrousher);


router.route("/get-all").get(
  // verifyJwt,
  getAllContacts
);
router.route("/get-all-brousher").get(
  // verifyJwt,
  getAllBrousher
);
router.route("/get-all-emails").get(
  getAllEmail
);
router.route("/delete").get(
  // verifyJwt,
  deleteContact
);

export default router;
