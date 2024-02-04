const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PeriodCycleSchema = new mongoose.Schema({
  email: { type: String, required: true },
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true },
});

const PeriodCycle = mongoose.model("PeriodCycle", PeriodCycleSchema);

// Track period cycle route
router.post("/periodCycle", async (req, res) => {
  try {
    const { email, startDate, duration } = req.body;

    // Create a new period cycle
    const periodCycle = new PeriodCycle({
      email,
      startDate: new Date(startDate),
      duration,
    });

    // Save the period cycle in the database
    await periodCycle.save();

    res.json({ msg: "Period cycle tracked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;