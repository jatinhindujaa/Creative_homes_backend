import { Contact } from "../models/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Whtsap } from "../models/whtsap.model.js";
import { Email } from "../models/email.model.js";
import { Brousher } from "../models/brousher.model.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, category, message } = req.body;
  console.log("req", req.body);
  
  
  if (!name || !email || !phone || !category || !message) {
    throw new ApiError(400, "Please fill all required fields!!!");
  } 

  const contact = await Contact.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});
const createWhtsap = asyncHandler(async (req, res) => {
  const { type1,type2, phone } = req.body;
  console.log("req", req.body);

  if (!type1|| !type2 || !phone) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Whtsap.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});
const createEmail = asyncHandler(async (req, res) => {
  const {email} = req.body;
  console.log("req", req.body);

  if (!email) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Email.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});
const createBrousher= asyncHandler(async (req, res) => {
  const { name, email, phone, message, brousherid } = req.body;
  console.log("req", req.body);

  if (!name || !email || !phone || !message || !brousherid) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Brousher.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Contacts found!!!", contacts));
});
const getAllWhatsapp = asyncHandler(async (req, res) => {
  const contacts = await Whtsap.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
});
const getAllEmail = asyncHandler(async (req, res) => {
  const contacts = await Email.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
});
const getAllBrousher = asyncHandler(async (req, res) => {
  const contacts = await Brousher.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Contacts found!!!", contacts));
});
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.query.id);
  if (!contact) {
    throw new ApiError(400, "No contact found!!!");
  }

  const deletedContact = await Contact.findByIdAndDelete(req.query.id);
  if (!deletedContact) {
    throw new ApiError(
      400,
      "Something went wrong while deleting the contact!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Contact deleted!!!"));
});

export {
  createContact,
  createBrousher,
  getAllContacts,
  deleteContact,
  createWhtsap,
  createEmail,
  getAllWhatsapp,
  getAllEmail,
  getAllBrousher,
};
