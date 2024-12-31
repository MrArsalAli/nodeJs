import express from "express";
import morgan from "morgan";
import userRoutes from "./routers/users.js";
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
const app = express();
app.use(cors());
const PORT = 4000;

// const tasks = [
//   {
//     id: 1,
//     task: "kaam karte rehna he",
//     completed: true,
//   },
//   {
//     id: 2,
//     task: "thak jao to rest karlena he but don't quit",
//     completed: false,
//   },
//   {
//     id: 3,
//     task: "consistency chahiye",
//     completed: true,
//   },
// ];

// library for watching live requests
// app.use(morgan("tiny"));

// function middleware(req, res, next) {
//   req.requestBy = "Arsalan Ali";
//   middleware ko use kar ke jahan marzi end karwaden
// app level pe lagaoge to koi bhi api nahin chalegi akele akele kisi pe lagaoge to sirf wohi run nahin hogi
// neche GET pe lagata hun
// res.status(500).send("Error in System")
//   next();
// }

// App level middleware
// app.use(middleware);
// Neccessary midlleware ta k body me jo bhi aae JSON me convert ho

app.use(express.json());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("err=>", err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to GET API:Server is running Good");
});

app.post("/", (req, res) => {
  const { email, password, role } = req.body;
  res.send("Welcome to POST API");
});

app.put("/", (req, res) => {
  res.send("Welcome to PUT API");
});

app.delete("/", (req, res) => {
  res.send("Welcome to DELETE API");
});

// akele akele sb routes use karne ka tariqa
// app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// params
// app.get("/singletask/:id", (req, res) => {
//   const task = tasks.find((data) => data.id == req.params.id);
//   if (!task) return res.status(404).send("Task Not Found");
//   res.status(200).send(task);
// });

// query
// app.get("/", (req, res) => {
//   const { completed } = req.query;
//   let filter = tasks;
//   if (completed)
//     filter = tasks.filter((data) =>
//       completed == "1" ? data.completed == true : data.completed == false
//     );
//   res.status(200).send(filter);
// });

app.listen(PORT, () => console.log("Server Started on port " + PORT));
