import { Schema } from "mongoose";

export let usersSchema = Schema({
  fName: {
    type: String,
    trim: true,
    required: [true, "fName field is required"],
    minLength: [4, "fname must be at least 4 character long"],
    maxLength: [20, "fname must be at most 20 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },
  lName: {
    type: String,
    trim: true,
    required: [true, "lName field is required"],
    minLength: [4, "lname must be at least 4 character long"],
    maxLength: [20, "lname must be at most 20 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },
  dob: {
    type: Date,
  },

  password: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        throw new Error("email is wrong.");
      }
    },
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "customer"],
      message: (notEnum) => {
        return `${notEnum.value} is not valid enum`;
      },
    },
  },
  
  isVerify: {
    type: Boolean,
    default: false,
  },
  isDeactivate: {
    type: Boolean,
    default: false,
  },
});
