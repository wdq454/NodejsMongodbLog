const express =require("express")
const app=express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1');

const schema={
    name:String,
    age:Number,
    health:String,
    hooby:String
}
const mydata = mongoose.model('cat1', schema);
const kitty = new mydata({ name: 'testZan3' });
kitty.save()

app.use('/',express.static('public'))
app.get("/input",(req,res)=>{
    res.send(req.query)
    console.log(req.query)
})
app.listen(10228)
