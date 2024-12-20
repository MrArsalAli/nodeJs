import express from "express";
const router = express.Router();
import Task from "../models/Task.js";
import sendResponse from "../helpers/sendResponse.js";


router.post("/", async (req, res) => {
  const { task } = req.body;
  let newTask = new Task({ task });
  newTask = await newTask.save();
  sendResponse(res, 201, newTask, false, "Task Added Successfully");
});


router.get("/", async (req, res) => {
  let tasks = await Task.find();
  sendResponse(res, 200, tasks, false, "Tasks Fetched Successfully");
});

export default router;
