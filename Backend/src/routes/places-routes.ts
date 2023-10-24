import express from "express";
import { check } from "express-validator";
import fileUpload from "../../middleware/file-upload";
import placesControllers from "./../controllers/places-controller";
import checkAuth from "../../middleware/check-auth";

const router = express.Router();

// Return specific place
router.get("/:_id", placesControllers.getPlaceById);

// Return all places by user
router.get("/user/:_id", placesControllers.getPlacesByUserId);

// Check user authentication
router.use(checkAuth);

// Post new place
router.post(
  "/",
  fileUpload.single("image"),
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.createPlace
);

// Update existing place
router.patch(
  "/:_id",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("description").notEmpty(),
  ],
  placesControllers.updatePlace
);

// Delete place
router.delete("/:_id", placesControllers.deletePlace);

export default router;
