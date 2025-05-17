const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 25,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 25,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // validate: {
      //   validator: function (value) {
      //     return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      //       value
      //     );
      //   },
      //   message: (props) => `${props.value} is not a valid emailId`,
      // },

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Please enter strong password" + value);
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
      default: "Default about section",
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid Photo URL");
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
