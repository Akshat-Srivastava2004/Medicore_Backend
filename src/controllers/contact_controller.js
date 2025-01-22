import { ApiError } from "../util/ApiError.js"; // Added missing file extension
import { Contact } from "../models/contact_model.js"; // Added missing file extension

const Contactrandom = async (req, res) => {
  try {
    const { Email, Message } = req.body;

    // Validate input
    if (!Email) {
      throw new ApiError(400, "Email is required");
    }
    if (!Message) {
      throw new ApiError(400, "Message is required");
    }

    // Create the contact entry in the database
    const contact = await Contact.create({
      Email,
      Message,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      data: contact,
      message: "Details submitted successfully",
    });
  } catch (error) {
    // Handle errors and send appropriate responses
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error("Server Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export { Contactrandom };
