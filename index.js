const express=require('express')
const app=express()
const path=require('path')
const body_parser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()

const User=require('./models/userModel')
const Post=require('./models/postModel')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))//this allows us to call views dir file from anywhere.
app.use(express.static('assets'))
app.use(body_parser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(body_parser.json()); // Parse JSON bodies


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

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',(req,res)=>{
    const {username,password}=req.body

  

})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',async(req,res)=>{
    const {username,password,email}=req.body
    const user=await User.find({username:username})
    if(!user){
        res.send('User already exist')
    }
    else{
        res.send(`Your name is ${username}, email is ${email} and you password is ${password}`)
    }
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen('3000',()=>{
    console.log('hosted on port 3000')
})