import HTTPError from "../models/http-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUserModel, UserModel } from "../models/userModel";

// GET Places by user
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let users: IUserModel[] | null;
  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    const error = new HTTPError(
      "Fetching users failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((u) => u.toObject()) });
};

// User post
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HTTPError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser: IUserModel | null;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (err) {
    const error = new HTTPError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HTTPError(
      "User already exist, please login instead",
      422
    );
    return next(error);
  }

  const createdUser = new UserModel({
    name,
    email,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HTTPError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject() });
};

// POST User
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser: IUserModel | null;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (err) {
    const error = new HTTPError("Logging failed, please try again later", 500);
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      new HTTPError("Invalid credentials, could not log you in", 401)
    );
  }

  res.json({ message: "Logged in" });
};

export default {
  getUsers,
  signup,
  login,
};
