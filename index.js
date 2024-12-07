import express from "express";
import morgan from "morgan";
const app = express();
const PORT = 4000;

app.use(morgan("tiny"));

function middleware(req, res, next) {
  req.requestBy = "Arsalan Ali";
  //   middleware ko use kar ke jahan marzi end karwaden
  // app level pe lagaoge to koi bhi api nahin chalegi akele akele kisi pe lagaoge to sirf wohi run nahin hogi
  // neche GET pe lagata hun
  // res.status(500).send("Error in System")
  next();
}

// App level middleware
app.use(middleware);
// Neccessary midlleware ta k body me jo bhi aae JSON me convert ho
app.use(express.json())

app.get("/", middleware, (req, res) => {
  console.log("request  by==>", req.requestBy);
  res.send("Welcome to GET API");
});

app.post("/", (req, res) => {
  res.send("Welcome to POST API");
});

app.put("/", (req, res) => {
  res.send("Welcome to PUT API");
});

app.delete("/", (req, res) => {
  res.send("Welcome to DELETE API");
});

app.listen(PORT, () => console.log("Server Started on port " + PORT));
