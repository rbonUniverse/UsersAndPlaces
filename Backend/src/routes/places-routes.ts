import express from "express";
import { check } from "express-validator";
import placesControllers from "./../controllers/places-controller";

const router = express.Router();

// Return specific place
router.get("/:_id", placesControllers.getPlaceById);

// Return all places by user
router.get("/user/:_id", placesControllers.getPlacesByUserId);

// Post new place
router.post(
  "/",
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
