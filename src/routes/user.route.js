import { Router } from "express";
import { Patientregister,loginpatient } from "../controllers/patient_controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { doctoredit, doctoreditmeetinglink, Doctorregister,logindoctor } from "../controllers/doctor_controller.js";
import { Adminregister,loginAdmin } from "../controllers/admin_controller.js";
import { loginStaff, Staffregister } from "../controllers/staff_controller.js";
import { Appointmentschedule } from "../controllers/appointment_controller.js";

const router=Router()
router.route("/Patientregister").post(
    upload.fields([
        {
            name:"PastReport",
        }
    ]),
    Patientregister
)
router.route("/loginpatient").post(loginpatient)
router.route("/Doctorregister").post(
    upload.fields([
        {
            name:"Profilephoto",
        }
    ]),
    Doctorregister
)
router.route("/logindoctor").post(logindoctor)
router.route("/adminregister").post(Adminregister)
router.route("/loginadmin").post(loginAdmin)
router.route("/staffregister").post(
    upload.fields([
        {
            name:"Adharcard",
        }
    ]),
    Staffregister
)
router.route("/loginstaff").post(loginStaff)
router.route("/appointment").post(Appointmentschedule)
router.route("/doctorupdatemeetinglink").post(doctoreditmeetinglink)
router.route("/doctorprescription").post(doctoredit)
export default router