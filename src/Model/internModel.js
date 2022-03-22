const mongoose = require('mongoose');
const validator = require("validator")
const ObjectId = mongoose.Schema.Types.ObjectId
const internmodel = new mongoose.Schema( {

name : {
    type : String,
    required : true
},

email: {
    required:true,
    unique:true,
    type:String,
    
},

mobile : {
    required : true,
    type : Number,
    unique : true,
    match : [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'please provide valid mobile number'],
  
},
collegeId : {
    type : ObjectId,
    ref : " collegeModel"
},
isDeleted :{
    type : Boolean,
    default : false
}
}, { timestamps: true });

module.exports = mongoose.model('interns', internmodel)

