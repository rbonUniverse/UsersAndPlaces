import express from "express";
import placesControlles from "./../controllers/places-controller";

const router = express.Router();

// Return specific place
router.get("/:_id", placesControlles.getPlaceById);

// Return all user by places
router.get("/user/:_id", placesControlles.getPlacesByUser);

// Post new place
router.post("/", placesControlles.createPlace);

// Update existing place
router.patch("/:_id", placesControlles.updatePlace);

// Delete place
router.delete("/:_id", placesControlles.deletePlace);

export default router;
