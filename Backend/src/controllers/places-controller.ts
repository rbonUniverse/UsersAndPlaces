import HTTPError from "../models/http-error";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

interface Places {
  _id?: string;
  creatorId?: string;
  title?: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

let DUMMY_PLACES: {
  _id?: string;
  creatorId?: string;
  title?: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
  address?: string;
}[] = [
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

// GET place by _id
const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

// GET Places by user
const getPlacesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params._id;
  const userPlaces = await DUMMY_PLACES.filter((p) => {
    return p.creatorId === userId;
  });
  if (!userPlaces || userPlaces.length <= 0) {
    return next(
      new HTTPError("Could not find a places for the provided user id", 404)
    );
  }
  res.json({ userPlaces });
};

// POST Place
const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  const { creatorId, title, description, coordinates, address } = req.body;
  const createdPlace = {
    _id: uuid(),
    creatorId,
    title,
    description,
    location: coordinates,
    address,
  };
  await DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

// UPDATE place
const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params._id;
  const { title, description } = req.body;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p._id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p._id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

// DELETE Place
const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params._id;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p._id !== placeId);
  res.status(200).json({ message: "Place Deleted" });
};

export default {
  getPlaceById,
  getPlacesByUser,
  createPlace,
  deletePlace,
  updatePlace,
};
