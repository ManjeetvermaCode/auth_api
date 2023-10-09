const JWT=require('jsonwebtoken')
const User=require('../models/userModel')

const isLoggedIn=async(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        try {
            const UserId=JWT.verify(token,process.env.JWT_SECRET)
            currentUser=await User.findById(UserId.UserId)
            next()
            
        } catch (error) {
            console.log(error)
           return res.status(401).send('User not found')
        }
    }
    else{
        return res.send('token not found, make sure you are logged in')

    }
   
}


module.exports=isLoggedIn