import { Router } from "express";
import { Patientregister,loginpatient, patientdetail } from "../controllers/patient_controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { doctordetail, doctoredit, doctoreditmeetinglink, Doctorregister,logindoctor, patientbydoctor,appointmentdoctor} from "../controllers/doctor_controller.js";
import { Adminregister,deleteDoctor,deletePatient,deleteStaff,getalldoctor,getallpatient,getallstaff,loginAdmin, updateDoctor, updatePatient, updateStaff } from "../controllers/admin_controller.js";
import { loginStaff, Staffregister } from "../controllers/staff_controller.js";
import { appointmentdetails, Appointmentschedule } from "../controllers/appointment_controller.js";
import { checklogout } from "../middleware/authenitcation.middleware.js";
import { userlogout } from "../controllers/logout_controller.js";

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
router.route("/patientdetail").post(patientdetail)
router.route("/doctordetail").post(doctordetail)
router.route("/appointmentdetails").post(appointmentdetails)
router.route("/doctorpanelpatientdetails").post(patientbydoctor)
router.route("/doctorappointment").post(appointmentdoctor)
router.route("/patientdelete/:id").delete(deletePatient)
router.route("/doctordelete/:id").delete(deleteDoctor)
router.route("/staffdelete/:id").delete(deleteStaff)
router.route("/updatepatient").put(updatePatient)
router.route("/updatedoctor").put(updateDoctor)
router.route("/updatedstaff").put(updateStaff)
router.route("/getallpatient").get(getallpatient)
router.route("/getalldoctor").get(getalldoctor)
router.route("/getallstaff").get(getallstaff)
router.route("/logout").post(checklogout,userlogout)

export default router