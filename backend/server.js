const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./userRoutes");
const periodCycleRoutes = require("./periodCycleRoutes");

const app = express();
const port = 8000;

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use("/api/users", userRoutes, periodCycleRoutes);
app.use("/api/data", periodCycleRoutes);
//Sends Integer to backend
// Your algorithm endpoint
// app.post("/api/algorithm", (req, res) => {
//   // Changed from app.get to app.post
//   const inputData = req.body;

//   // Implement your algorithm logic here using inputData
//   //   const algorithmResult = processData(inputData); // Replace with your actual algorithm
//   const algorithmResult = "Dhruv";
//   res.json({ result: algorithmResult });
// });
//Sends Integer, String to backend, return array with date.
app.post("/api/algorithm", (req, res) => {
  const inputData = req.body;
  const inputString = inputData.string;
  const inputInteger = inputData.integer;

  // Implement your algorithm logic here using inputData
  const currentDate = new Date();
  const algorithmResult = Array.from({ length: inputInteger }, (_, i) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    return `${inputString} ${newDate.toISOString().split("T")[0]}`;
  });

  res.json({ result: algorithmResult });
});

//Returns five dates given Date and Integer
// app.post("/api/phases", (req, res) => {
//   const inputData = req.body;
//   const inputDate = new Date(inputData.date); // Convert the input date string to a Date object
//   const inputInteger = inputData.integer;

//   // Implement your algorithm logic here using inputData
//   const algorithmResult = Array.from({ length: inputInteger }, (_, i) => {
//     const newDate = new Date(inputDate);
//     newDate.setDate(inputDate.getDate() + i);
//     return `${newDate.toISOString().split("T")[0]}`;
//   });

//   res.json({ result: algorithmResult });
// });
/**
 * Returns all dates with Date and Integer passed as parameter
 */
app.post("/api/phases", (req, res) => {
  const inputData = req.body;
  const inputDate = new Date(inputData.date); // Convert the input date string to a Date object
  const inputInteger = inputData.integer;

  // Create new dates based on the inputDate and the specified offsets
  const newDate1 = new Date(inputDate);
  newDate1.setDate(inputDate.getDate() + inputInteger);

  const newDate2 = new Date(inputDate);
  newDate2.setDate(inputDate.getDate() + 14);

  const newDate3 = new Date(inputDate);
  newDate3.setDate(inputDate.getDate() + 15);

  const newDate4 = new Date(inputDate);
  newDate4.setDate(inputDate.getDate() + 28);

  // Get the current date
  const currentDate = new Date();

  // Format the dates to ISO string and split to get only the date part
  const algorithmResult = [
    inputDate.toISOString().split("T")[0],
    newDate1.toISOString().split("T")[0],
    newDate2.toISOString().split("T")[0],
    newDate3.toISOString().split("T")[0],
    newDate4.toISOString().split("T")[0],
  ];

  res.json({ result: algorithmResult });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});