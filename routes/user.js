const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    await User.create({
        username: username,
        password: password
    })
        .then(() => {
            res.status(201)
                .json({
                    msg: "User created successfully"
                })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    msg: "User not created"
                })
        })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
        .then((response) => {
            res.json({ Courses: response })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    msg: "Courses not found"
                })
        })
});




router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    console.log(username, courseId)
    try {
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchaseCourses: courseId
            }
        })
    } catch (e) {
        console.log(e)
    }
    res.status(200)
        .json({
            msg: "Course purchased successfully"
        })


});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
  const user = await User.findOne({
        username: req.headers.username
    })
    const courses = await Course.find({
        _id:{
            "$in": user.purchaseCourses
        }
    })

    res.json({courses: courses})
    
});

module.exports = router