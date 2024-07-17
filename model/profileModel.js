const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: Number, required: true },
});

const ProfileModel = mongoose.model("information", ProfileSchema);

module.exports = ProfileModel;
