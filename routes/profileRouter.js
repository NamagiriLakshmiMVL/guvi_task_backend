const express = require("express");
const ProfileModel = require("../model/profileModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let newInfo = new ProfileModel({
      age,
      dob,
      mobile,
      gender,
    });
    await newInfo.save();
    res.send({ message: "Information Added Successfully" });
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
