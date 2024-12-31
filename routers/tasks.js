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




router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id)
  if(!task) return sendResponse(res, 404, null, true, "task not found")
  sendResponse(res, 200, task, false, "Task Fetched Successfully");
});


router.put("/:id", async (req, res) => {
  const { task, completed } = req.body
  const taskfromDB = await Task.findById(req.params.id)
  if(!taskfromDB) return sendResponse(res, 404, null, true, "task not found")
  if(task) taskfromDB.task = task
  if(completed) taskfromDB.completed = completed
  await taskfromDB.save()
  sendResponse(res, 201, taskfromDB, false, "Task updated Successfully");
});




router.delete("/:id", async (req, res) => {
  const taskfromDB = await Task.findById(req.params.id)
  if(!taskfromDB) return sendResponse(res, 404, null, true, "task not found")
  await Task.deleteOne({ _id : req.params.id})
  sendResponse(res, 201, null, false, "Task Deleted Successfully");
});

export default router;
