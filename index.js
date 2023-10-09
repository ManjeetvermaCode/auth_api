const express=require('express')
const app=express()
const path=require('path')
const body_parser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const cors=require('cors')


const User=require('./models/userModel')
const Post=require('./models/postModel')

const createToken=require('./utilities/createToken')
const isLoggedIn=require('./middlewares/isUser')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))//this allows us to call views dir file from anywhere.
app.use(express.static('assets'))
app.use(body_parser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(body_parser.json()); // Parse JSON bodies
app.use(cookieParser())



app.use((req,res,next)=>{
  res.locals.currentUser2=app.locals.currentUser||null
  // console.log(res.locals.currentUser)
  next()
})

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
})



app.get('/login',async(req,res)=>{
    res.render('login')
  
})
app.post('/login',cors(),async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})

    const isUser=await bcrypt.compareSync(password,user.password)
    
    if(isUser){
      app.locals.currentUser=user
      createToken(res,user._id)
     return res.redirect('/')
    // return  res.status(200).send('you are logged in successfully')
    }
   return res.status(403).send('Incorrect Username or Password')
  

})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  

    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use. Please try again with a different email.' });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });
  
      const savedUser = await newUser.save();
  
      createToken(res,savedUser._id)
      res.redirect('/')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  });

app.get('/logout',(req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expiresIn:new Date(0)

  })
  app.locals.currentUser=null
  return res.redirect('/')

})
  
app.get('/createposts',isLoggedIn,cors(),(req,res,next)=>{
  res.render('createPost')
})

app.post('/createpost',async(req,res)=>{
  const {title,body}=req.body
  const userId=app.locals.currentUser
  console.log(userId)
  const newpost=new Post({
    title,
    body,
    createdBy:userId._id
  })
  const savedPost=await newpost.save()
  console.log(savedPost)
  res.redirect('/')
})

app.get('/',isLoggedIn,async (req, res) => {
  const user = app.locals.currentUser;
  
  if (user) {
    const posts=await Post.find({createdBy:user._id})
    console.log(posts)
    res.render('home', { username: user.username,posts });
  } else {
    res.redirect('/login');
  }
 
});


app.listen('3000',()=>{
    console.log('hosted on port 3000')
})