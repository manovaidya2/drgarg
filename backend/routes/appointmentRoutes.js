import express from "express";
import {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

/* USER */
router.post("/book", createAppointment);

/* ADMIN */
router.get("/admin/all", getAllAppointments);
router.delete("/admin/:id", deleteAppointment);

export default router;
