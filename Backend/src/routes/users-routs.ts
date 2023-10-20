import express from "express";
import { check } from "express-validator";
import usersControllers from "./../controllers/users-controllers";

const router = express.Router();

// Return all users
router.get("/", usersControllers.getUsers);

// Post new user
router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

// Update existing user
router.post("/login", usersControllers.login);

export default router;
