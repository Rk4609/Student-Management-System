import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    Studentname: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    standard: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
