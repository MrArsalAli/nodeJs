import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import "dotenv/config";
import User from "../models/User.js";
import { authenticateUser } from "../middleware/authentication.js";
const router = express.Router();

const users = [
  {
    fullname: "Arsalan Ali",
    email: "Arsalanali@gmail.com",
    id: 1,
  },
];

// get all users
router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    data: users,
    msg: "User's fetched successfully",
  });
});

// register new users
router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    error: false,
    data: users,
    msg: "User added successfully",
  });
});

// get single user
router.get("/:id", (req, res) => {
  const user = users.find((data) => data.id == req.params.id);
  if (!user) {
    return res.status(404).json({
      error: true,
      data: null,
      msg: "User not found",
    });
  }
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    error: false,
    data: user,
    msg: "User found successfully",
  });
});

router.put("/", authenticateUser, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { city, country },
      { new: true }
    ).exec(true);
    sendResponse(res, 200, user, false, "User Updated Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, "Error on PUT API");
  }
});

export default router;
