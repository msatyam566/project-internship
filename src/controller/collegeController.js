const collegeModel = require("../Model/collegeModel");
const internModel = require("../Model/internModel");

const createCollege = async function (req, res) {
   try {
      let college = req.body;
      
      if (Object.keys(college).length == 0) {
         res.status(400).send({ status: false, msg: "Bad request please provide data" })
      }
      if (!college.name) return res.status(400).send({ status: false, msg: "please enter name " })
      if (!college.fullName) return res.status(400).send({status: false,  msg: "please enter full name " })
      if (!college.logoLink) return res.status(400).send({status: false,  msg: "please enter valid link " })

      if (Object.keys(college).length != 0) {
         let collegeCreated = await collegeModel.create(college);
         res.status(201).send({ status: true, msg: collegeCreated });
      }
      else res.status(404).send({ msg: "bad request" })
   }
   catch (err) {
      console.log("this is the error:", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
   }
};

const getcollegeDetails = async function(req,res){
try{
   const collegeName = req.query.collegeName

   if(!collegeName){return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid collegeName"})}
   const college =await collegeModel.find({ name:collegeName, isDeleted: false })
   if (!college) {
      return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
    }
     console.log(college)
    const collegeId = college[0].id
  
    
      const interName = await internModel.find({collegeId: collegeId, isDeleted : false})
      if(interName.length <= 0) return res.status(404).send({msg: `No intern apply for this college: ${college} `})
      const interns =[]

      for (let i=0; i<interName.length;i++)
      {
          let Object={}
          Object._id = interName[i].id
          Object.name=interName[i].name
          Object.email = interName[i].email
          Object.mobile=interName[i].mobile
          interns.push(Object)
      }

      const ObjectData = {
          name:college[0].name,
          fullName:college[0].fullName,
          logoLink:college[0].logoLink,
          interns:interns
      }
      
    return res.status(201).send({ status: true, count : interns.length, msg:ObjectData })


}
catch (err) {
  return res.status(500).send({ status: false, msg: err.message })
}
}







module.exports.createCollege = createCollege
module.exports.getcollegeDetails=getcollegeDetails