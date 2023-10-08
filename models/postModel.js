const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:{
        require:true,
        type:String,

    },
    description:{
        require:true,
        type:String,
    },
  
})

module.exports=mongoose.model('Post',postSchema)