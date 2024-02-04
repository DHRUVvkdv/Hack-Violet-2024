const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MongoDB connection string
mongoose.connect(
  "mongodb+srv://dhruvvarshneyemail:vdcT9tQDl4pc2lt4@hackviolet.qvqxfib.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// User schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    const token = jwt.sign({ email: user.email }, "dhruvandady", {
      expiresIn: "1h",
    });

    res.json({ msg: "User registered successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/checkuser/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User already exists" });
    } else {
      return res.json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Create a JWT
    const token = jwt.sign({ email: user.email }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Return the JWT in the response
    res.json({ msg: "User signed in successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Get user name route
router.get("/username/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Query the database for a user with the provided email
    let user = await User.findOne({ email });
    if (user) {
      // If the user exists, return the user's first and last name
      res.json({ firstName: user.firstName, lastName: user.lastName });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
