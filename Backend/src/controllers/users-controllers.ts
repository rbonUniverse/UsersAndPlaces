import HTTPError from "../models/http-error";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

interface Places {
  _id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

let DUMMY_USERS: {
  _id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}[] = [
  {
    _id: "u1",
    firstName: "ROBBY",
    lastName: "ZIGI",
    username: "ROBB",
  },
  {
    _id: "u2",
    firstName: "PATRICK",
    lastName: "BET",
    username: "JJ",
  },
];

// GET Places by user
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await DUMMY_USERS.map((p) => {
    p;
  });

  if (!users || users.length <= 0) {
    return next(new HTTPError("Could not find users", 404));
  }
  res.json({ users });
};

// User post
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// POST User
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { _id, username } = req.body;

  const user = await DUMMY_USERS.find(
    (u) => u._id === _id && u.username === username
  );
  res.status(201).json({ user });
};

export default {
  getUsers,
  userLogin,
  createUser,
};
