const mongoose = require('mongoose');

// coonect to DB
mongoose.connect("mongodb+srv://parasbharde:A55F3C6dZZQ4NGM3@coursecluster.i62yrtm.mongodb.net/course_selling_app")
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

const CourseSchema = new mongoose.Schema({
   title: String,
   description: String,
   imageLink : String,
   price: Number
})

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports ={
    Admin,
    User,
    Course
}


