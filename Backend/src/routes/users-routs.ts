import express from "express";
import { check, body } from "express-validator";
import usersControlles from "./../controllers/users-controllers";

const router = express.Router();

// Return all users
router.get("/", usersControlles.getUsers);

// Post new user
router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControlles.signup
);

// Update existing user
router.post("/login", usersControlles.login);

export default router;
