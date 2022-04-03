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
            return res.status(400).send({ status: false, msg: "enter unique name" })
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
   try{
      res.setHeader('Acess-Control-Allow-origin','*')
      if (req.query.collegeName){
         let college = await collegeModel.findOne({name:req.query.collegeName, isDeleted:false})
         if(!college){
            res.status(404).send({status:false,msg:" college not found"})
         }   else{
               let collegeData ={
                  name:college.name,
                  fullName:college.fullName,
                  logoLink:college.logoLink

               }
               let interns = await internModel.find({collegeId: college._id, isDeleted:false},'-collegeId -isDeleted -createdAt -updatedAt -v').sort({createdAt:-1})
               if (interns){
                  collegeData.interns = interns
               }
               res.status(201).send({status:true,data:collegeData})
            }
               }      else{ 
                  res.status(404).send({status:false,msg:"college Name must be presnt"})

            }
         } catch (error){
            res.status(500).send({status:false,msg:error.messege})
         } 
         
      
   }





module.exports.createCollege = createCollege
module.exports.getcollegeDetails = getcollegeDetails









