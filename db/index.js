const mongoose = require('mongoose');
require('dotenv').config();
// coonect to DB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log(err)
})

// Define Schema

const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
})

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   purchaseCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
   }]

})

const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    message: String
})

const CourseSchema = new mongoose.Schema({
   title: String,
   description: String,
   imageLink : String,
   price: Number
})

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", CourseSchema);
const Contact = mongoose.model("Contact", ContactSchema);

module.exports ={
    Admin,
    User,
    Course,
Contact
}


