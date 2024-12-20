import express from "express";
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

export default router;
