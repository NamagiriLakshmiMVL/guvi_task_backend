const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
const genPassword = require("../helper.js");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { password, email, name } = req.body;
    const isUserExists = await userModel.findOne({ email: email });
    if (isUserExists) {
      res.send({ message: "Email Already Exists" });
      return;
    }
    const hashedPassword = await genPassword(password);
    let newUser = new userModel({
      password: hashedPassword,
      email,
      name,
    });
    await newUser.save();
    res.send({ message: "User Added Successfully" });
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const newLogin = await userModel.findOne({ email: req.body.email });
    if (newLogin) {
      const storedDbPassword = newLogin.password;
      const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
      if (!isPasswordMatch) {
        res.send({ message: "Invalid Credentials" });
        return;
      }

      res.send({ message: "Login Success" });
    } else {
      res.send({ message: "Invalid Credentials" });
      return;
    }
  } catch (err) {
    res.send({ message: "Invalid Credentials" });
  }
});

module.exports = router;
