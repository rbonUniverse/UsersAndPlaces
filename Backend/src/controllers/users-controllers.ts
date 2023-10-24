import HTTPError from "../models/http-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUserModel, UserModel } from "../models/userModel";
import { IPlaceModel } from "../models/placeModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface UserFieldsInterface {
  name: string;
  email: string;
  image: Request;
  password: string;
  places: IPlaceModel[];
}

let token: string;
const secretKey = "ururt_sfdsfsfdsf_";

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

  const { name, email, password }: UserFieldsInterface = req.body;

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

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err: any) {
    const error = new HTTPError("Could not create user, please try again", 500);
    return next(error);
  }

  const createdUser: IUserModel = new UserModel({
    name,
    email,
    image: req.file?.path,
    password: hashedPassword,
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

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      secretKey,
      { expiresIn: "1h" }
    );
  } catch (err: any) {
    const error = new HTTPError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

// POST User
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: UserFieldsInterface = req.body;

  let existingUser: IUserModel | null;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (err) {
    const error = new HTTPError("Logging failed, please try again later", 500);
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HTTPError("Invalid credentials, could not log you in", 401)
    );
  }

  let isValidPassword: boolean = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HTTPError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HTTPError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      secretKey,
      { expiresIn: "1h" }
    );
  } catch (err: any) {
    const error = new HTTPError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

export default {
  getUsers,
  signup,
  login,
};
