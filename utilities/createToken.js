
const jwt=require('jsonwebtoken')

const createToken=(res,UserId)=>{
    const token=jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:false,
        samesite:'none',
        maxAge:30*24*60*60*1000
    })
}

module.exports=createToken