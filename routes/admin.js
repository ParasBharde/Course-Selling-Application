const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")


router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username: username,
        password: password
    })
        .then(() => {

            res.status(201)
                .json({
                    msg: "Admin created Successfully"
                })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    msg: "Admin not created"
                })
        })
    // check if a user with this username exists
    // if not, create a new user
    // if yes, return an error

})

router.post('/courses', adminMiddleware, async (req, res) => {
    // logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.status(201)
        .json({
            msg: "Course created successfully", courseId: newCourse._id
        })
})

router.get('/courses', adminMiddleware, async (req, res) => {
    // logic
 const response = await  Course.find({})
   .then((response) => {
    res.json(response)
   })
   .catch((err) => {
       res.status(400)
       .json({
           msg: "Courses not found"
       })
   })
})

module.exports = router 