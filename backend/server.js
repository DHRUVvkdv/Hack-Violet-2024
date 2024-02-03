const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Your algorithm endpoint
app.post("/api/algorithm", (req, res) => {
  // Changed from app.get to app.post
  const inputData = req.body;

  // Implement your algorithm logic here using inputData
  //   const algorithmResult = processData(inputData); // Replace with your actual algorithm
  const algorithmResult = "Dhruv";
  res.json({ result: algorithmResult });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
