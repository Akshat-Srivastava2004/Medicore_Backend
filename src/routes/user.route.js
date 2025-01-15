import { Router } from "express";
import { Patientregister,loginpatient } from "../controllers/patient_controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { Doctorregister,logindoctor } from "../controllers/doctor_controller.js";
import { Adminregister,loginAdmin } from "../controllers/admin_controller.js";
import { loginStaff, Staffregister } from "../controllers/staff_controller.js";
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
export default router