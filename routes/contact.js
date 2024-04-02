const express = require('express');
const router = express.Router();
const {Contact } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phone = req.body.phone
    const message = req.body.message

    await Contact.create({
        firstName:firstname,
        lastName:lastname,
        email:email,
        phoneNumber:phone,
        message:message
        
    })
        .then(() => {
            res.status(201)
                .json({
                    msg: "Data Saved successfully"
                })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    msg: "User not created"
                })
        })
});

router.get('/info', (req, res) => {
    // Implement listing all courses logic
    Contact.find({})
        .then((response) => {
            res.json({ Courses: response })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    msg: "data not found"
                })
        })
});



module.exports = router