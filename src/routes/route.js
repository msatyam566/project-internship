const express = require('express');
const router = express.Router();

const controller = require("../controller/collegeController")
const interncontroller = require("../controller/internController")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/colleges", controller.createCollege)
router.post("/interns",interncontroller .createIntern)
router.get("/getcollegedetails", controller.getcollegeDetails)



module.exports = router;