const collegeModel = require("../Model/collegeModel");
const internModel = require("../Model/internModel")
const emailValidator = require('validator');

const createIntern = async function (req, res) {
    try{
        let data= req.body
        const {email} = req.body
        if(Object.entries(data).length==0){
            res.status(400).send({ status: false , msg: "please pass some data above"})
        }
        const isValidEmail = emailValidator.isEmail(email)
        if (!isValidEmail){
            return res.status(400).send({ status: false , msg : " invalid email"})
        }
        else{
        let collegeId = req.body.collegeId
        let college = await collegeModel.findById(collegeId)
        if(!college) {
            return res.status(401).send({ status: false , msg : "no such collegeId is present, please recheck Id"})
        }
     
        let name2 = req.body.name
        if(!name2) 
        return res.status(400).send({ status : false, msg : "please provide name"})
    
        let email= req.body.email
        if (!email)
        return res.status(400).send({ status : false , msg : "provide email"})
    
        let mobile = req.body.mobile
        if (!mobile)
        return res.status(400).send({ status : false, msg : "please provide a number"})
    
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile))) {
            res.status(400).send({status : false , msg : " enter valid no."})
            return
        }
    
        let validemail = await internModel.findOne({email})
        if (validemail) {
            return res.status(401).send({ status : false, msg :"email id is already exist"})
        }
            let validnumber = await internModel.findOne({mobile})
        if (validnumber) {
            return res.status(401).send({ status : false, msg :"mobile number is already exist"})
      }
    
        let savedData= await internModel.create(data)
        return res.status(201).send({ status : true, data : savedData})
    
    }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({ status : false, msg : error.message })
       }
       };


module.exports.createIntern = createIntern