const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        require:true,
        type:String,
        unique:false
    },
    password:{
        require:true,
        type:String,
    },
    email:{
        require:true,
        type:String,
        unique:true
    }
})

module.exports=mongoose.model('User',userSchema)