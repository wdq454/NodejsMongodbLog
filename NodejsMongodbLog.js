const express =require("express")
const app=express()
const mongoose = require('mongoose');
const ejs=require('ejs')

mongoose.connect('mongodb://172.21.2.236:27017/180110910228');

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
app.listen(10228)
