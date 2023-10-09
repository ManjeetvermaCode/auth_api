const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:{
        require:true,
        type:String,

    },
    body:{
        require:true,
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.String,
        ref:'User'
        
    }
  
})

module.exports=mongoose.model('Post',postSchema)