import { Feedback } from "../models/Feedback_model.js";
import { Patient } from "../models/patient_model.js";
import { ApiError } from "../util/ApiError.js";

const Feedbackbypatient = async (req, res, next) => {
  try {
    const { patientname, message } = req.body;

    // Validate input
    if (!patientname) {
      throw new ApiError(401, "Patient name is required.");
    }
    if (!message) {
      throw new ApiError(401, "Message is required.");
    }

    // Find the patient by name
    const patientRecord = await Patient.findOne({ Name: patientname });
    if (!patientRecord) {
      throw new ApiError(404, "Patient not found. Please register first.");
    }

    // Extract patient ID
    const patientId = patientRecord._id;

    // Create feedback
    const feedback = await Feedback.create({
      Patient: patientId,
      Message: message,
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Feedback successfully created.",
      data: feedback,
    });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
};

export { Feedbackbypatient };
