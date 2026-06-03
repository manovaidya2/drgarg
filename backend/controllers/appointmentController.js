import Appointment from "../models/Appointment.js";

/* CREATE APPOINTMENT */
export const createAppointment = async (req, res) => {
  try {
    const { name, phone, email, concern, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const appointment = await Appointment.create({
      name,
      phone,
      email,
      concern,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* DELETE APPOINTMENT */
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ADMIN – GET ALL APPOINTMENTS */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};