const express = require('express');
const router = express.Router();

const controller = require("../controller/collegeController")
const interncontroller = require("../controller/internController")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/functionup/colleges", controller.createCollege)
router.post("/functionup/interns",interncontroller .createIntern)
router.get("/functionup/getcollegedetails", controller.getcollegeDetails)



module.exports = router;