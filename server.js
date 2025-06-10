require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/ToDoRoutes");
const path = require("path");
console.log(process.env.DB_URL);

console.log("hi");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
