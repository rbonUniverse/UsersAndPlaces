import express from "express";
import usersControlles from "./../controllers/users-controllers";

const router = express.Router();

// Return all users
router.get("/user/:_id", usersControlles.getUsers);

// Update existing user
router.get("/login", usersControlles.userLogin);

// Post new user
router.post("/signup", usersControlles.createUser);

export default router;
