import dotenv from "dotenv";

import connectDB from "./database/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './public/.env'
});

// const admindata = {
//     adminname: "akshat",
//     Password: "mernstack"
// };

// Admin.create(admindata)
//     .then(savedAdmin => {
//         console.log('Admin data saved:', savedAdmin);
//     })
//     .catch(err => {
//         console.error('Error saving admin data:', err);
//     });


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 6000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 6000}`);
           
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
