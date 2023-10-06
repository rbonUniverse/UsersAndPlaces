import HTTPError from "../models/http-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import getCoordinatesForAddress from "../../util/location";
import { PlaceModel, IPlaceModel, placeSchema } from "../models/placeModel";
import { IUserModel, UserModel } from "../models/userModel";
import mongoose from "mongoose";

// GET place by _id
const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params._id;

  let place: IPlaceModel | null;
  try {
    place = await PlaceModel.findById(placeId).exec();
  } catch (err) {
    const error = new HTTPError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HTTPError(
      "Could not find a place for the provided id",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject() });
};

// GET Places by user
const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params._id;

  let userPlaces: IPlaceModel[];
  try {
    userPlaces = await PlaceModel.find({
      creatorId: userId,
    }).exec();
  } catch (err) {
    const error = new HTTPError(
      "Something went wrong, could not find a places for this user.",
      500
    );
    return next(error);
  }

  if (!userPlaces || userPlaces.length <= 0) {
    const error = new HTTPError(
      "Could not find a places for the provided user id",
      404
    );
    return next(error);
  }
  res.json({ places: userPlaces.map((place) => place.toObject()) });
};

// POST Create Place
const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HTTPError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { creatorId, title, description, address } = req.body;

  let coordinates: { lat: number; lng: number };
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new PlaceModel({
    creatorId,
    title,
    description,
    address,
    location: coordinates,
    image: "https://media.timeout.com/images/101705309/image.jpg",
  });

  let user: IUserModel | null;

  try {
    user = await UserModel.findById(creatorId);
  } catch (err) {
    const error = new HTTPError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HTTPError(
      "Could not find user for the provided _id",
      404
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace.toObject());
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HTTPError(
      "Could not creating place failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

// UPDATE place
const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HTTPError("Invalid inputs passed, please check your data", 422)
    );
  }
  const placeId = req.params._id;
  const { title, description } = req.body;

  let place: IPlaceModel | null;
  try {
    place = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        title: title,
        description: description,
      },
      { new: true }
    );
  } catch (err) {
    const error = new HTTPError(
      "Something went wrong, could not find place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place });
};

// DELETE Place
const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params._id;

  let place: IPlaceModel | null;

  try {
    place = await PlaceModel.findById(placeId);

    if (!place) {
      const error = new HTTPError("Could not find place for this _id", 404);
      return next(error);
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await place?.deleteOne({ session });
    const creator = await UserModel.findById(place?.creatorId);

    if (creator) {
      // Remove the place from the creator's places array
      creator.places = creator.places.filter(
        (creatorPlaceId) => !creatorPlaceId.equals(place?._id)
      );

      // Save the modified creator document
      await creator.save({ session });
    }
    await session.commitTransaction();
  } catch (err) {
    const error = new HTTPError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Place Deleted" });
};

export default {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  deletePlace,
  updatePlace,
};
