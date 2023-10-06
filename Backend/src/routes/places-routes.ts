import express from "express";
import { check } from "express-validator";
import placesControlles from "./../controllers/places-controller";

const router = express.Router();

// Return specific place
router.get("/:_id", placesControlles.getPlaceById);

// Return all user by places
router.get("/user/:_id", placesControlles.getPlacesByUserId);

// Post new place
router.post(
  "/",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  placesControlles.createPlace
);

// Update existing place
router.patch(
  "/:_id",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("description").notEmpty(),
  ],
  placesControlles.updatePlace
);

// Delete place
router.delete("/:_id", placesControlles.deletePlace);

export default router;
