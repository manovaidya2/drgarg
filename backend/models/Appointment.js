import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    concern: {
      type: String,
      default: "Autism / ADHD",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);