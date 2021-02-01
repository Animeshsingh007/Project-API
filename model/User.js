const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String
    },
    confirmPassword: {
      type: String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETE", "BLOCK"],
      default: "ACTIVE"
    }
  }, { timestamps: true })

module.exports = mongoose.model("USER",userSchema);
