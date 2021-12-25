const express =require("express")
const app=express()
const mongoose = require('mongoose');
const ejs=require('ejs')

mongoose.connect('mongodb://localhost:27017/180110910228');

const schema={
    name:String,
    age:Number,
    health:String,
    hooby:String
}
const mydata = mongoose.model('cat1', schema);
// const kitty = new mydata({ name: 'testZan3' });
// kitty.save()

app.use('/',express.static('public'))
app.get("/input",(req,res)=>{
    //res.send(req.query)
    console.log(req.query)
    const kitty = new mydata({ name: req.query.first,health:req.query.second});
    kitty.save()
    ejs.renderFile("result.html",{returnVal:"success"},(err,str)=>{
        res.send(str)
    })
})
app.get("/input1",(req,res)=>{
    ejs.renderFile("denglu.html",{returnVal1:"欢迎进入体侧成绩查询系统"},(err,str)=>{
        res.send(str)
    })
})
app.get("/input2",(req,res)=>{
    ejs.renderFile("zhuce.html",{returnVal2:"欢迎进入体侧成绩查询系统"},(err,str)=>{
        res.send(str)
    })
})
app.listen(10228)
