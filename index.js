const express=require('express')
const app=express()

const path=require('path')


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))//this allows us to call views dir file from anywhere.
app.use(express.static('assets'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen('3000',()=>{
    console.log('hosted on port 3000')
})