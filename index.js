const express=require('express')
const app=express()
const ejs=require('ejs')

// app.use('view engine','ejs')

app.get('/',(req,res)=>{
    res.send('this is home page')
})

app.listen('3000',()=>{
    console.log('hosted on port 3000')
})