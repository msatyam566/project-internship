const collegeModel = require("../Model/collegeModel");
const internModel = require("../Model/internModel");

const createCollege = async function (req, res) {

   try {
      let college = req.body;
      if (Object.entries(college).length == 0) {
         res.status(400).send({ status: false, msg: "please pass some data above" })
      }

      else {
         let name = req.body.name
         if (!name)
            return res.status(400).send({ status: false, msg: "enter valid name" })

         let fullName = req.body.fullName
         if (!fullName)
            return res.status(400).send({ status: false, msg: " please enter full name" })

         let logoLink = req.body.logoLink
         if (!logoLink)
            return res.status(400).send({ status: false, msg: "please provide logoLink" })

         let Name = await collegeModel.findOne({ name })
         if (Name) {
            return res.status(401).send({ status: false, msg: "enter unique name" })
         }
         let savedCollege = await collegeModel.create(college);
         res.status(201).send({ status: true, msg: savedCollege });
      }
   }


   catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, msg: error.message })
   }
};

const getcollegeDetails = async function (req, res) {
   try {
      const collegeName = req.query.collegeName

      if (!collegeName) { return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid collegeName" }) }
      const college = await collegeModel.find({ name: collegeName, isDeleted: false })
      if (!college) {
         return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
      }
      console.log(college)
      const collegeId = college[0].id


      const interName = await internModel.find({ collegeId: collegeId, isDeleted: false })
      if (interName.length == 0) return res.status(404).send({ msg: `No intern apply for this college: ${college} ` })
      const interns = []

      for (let i = 0; i < interName.length; i++) {
         let Object = {}
         Object._id = interName[i].id
         Object.name = interName[i].name
         Object.email = interName[i].email
         Object.mobile = interName[i].mobile
         interns.push(Object)
      }

      const ObjectData = {
         name: college[0].name,
         fullName: college[0].fullName,
         logoLink: college[0].logoLink,
         interns: interns
      }

      return res.status(200).send({ status: true, count: interns.length, msg: ObjectData })


   }
   catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
   }
}







module.exports.createCollege = createCollege
module.exports.getcollegeDetails = getcollegeDetails