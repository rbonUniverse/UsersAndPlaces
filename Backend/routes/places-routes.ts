import express from "express";
import HTTPError from "../models/http-error";

const router = express.Router();

const DUMMY_PLACES = [
  {
    _id: "p1",
    creatorId: "u1",
    title: "Empire",
    description: "One of the most exiting",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York NY 10001",
  },
  {
    _id: "p2",
    creatorId: "u1",
    title: "Great!!!!!!!!",
    description: "One of the most exiting",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York NY 10001",
  },
  {
    _id: "p3",
    creatorId: "u6",
    title: "Empire",
    description: "One of the most exiting",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York NY 10001",
  },
];

// Return specific place
router.get("/:_id", async (req, res, next) => {
  const placeId = req.params._id;
  const place = await DUMMY_PLACES.find((p) => {
    return p._id === placeId;
  });
  if (!place) {
    return next(
      new HTTPError("Could not find a place for the provided id", 404)
    );
  }
  res.json({ place });
});

// Return all user by places
router.get("/user/:_id", async (req, res, next) => {
  const userId = req.params._id;
  const userPlaces = await DUMMY_PLACES.filter((p) => {
    return p.creatorId === userId;
  });
  if (userPlaces.length <= 0) {
    return next(
      new HTTPError("Could not find a places for the provided user id", 404)
    );
  }
  res.json({ userPlaces });
});

export default router;
