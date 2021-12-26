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

//跳转到登录页面
app.get("/input1",(req,res)=>{
    ejs.renderFile("denglu.html",{returnVal1:"欢迎进入体测成绩查询系统"},(err,str)=>{
        res.send(str)
    })
})

//跳转到注册页面
app.get("/input2",(req,res)=>{
    ejs.renderFile("zhuce.html",{returnVal2:"欢迎进入体测成绩查询系统"},(err,str)=>{
        res.send(str)
    })
})

//用户数据库设计
const schema1={
    name:String,
    mima:String
}
const yonghu = mongoose.model('yonghu', schema1);
//用户注册数据保存
//注册后跳转到登录页面
app.get("/zhuce",(req,res)=>{
    console.log(req.query)
    if(req.query.name==""||req.query.mima==""){
        ejs.renderFile("zhuce.html",{returnVal2:"用户名、密码不可为空，请重新注册"},(err,str)=>{
            res.send(str)
        })
    }
    else{
        const yonghu1 = new yonghu({ name: req.query.name,mima:req.query.mima});
        yonghu1.save()
        ejs.renderFile("yhdenglu.html",{returnVal3:"注册成功！欢迎登录"},(err,str)=>{
            res.send(str)
        })
    }

})
//跳转到用户登录页面
app.get("/denglu2",(req,res)=>{
    ejs.renderFile("yhdenglu.html",{returnVal3:"欢迎登录"},(err,str)=>{
        res.send(str)
    })
})
//跳转到管理员登录页面
app.get("/denglu1",(req,res)=>{
    ejs.renderFile("gldenglu.html",{returnVal4:"管理员登录"},(err,str)=>{
        res.send(str)
    })
})
//验证登录信息
//跳转到用户主页
app.get("/yhdenglu",(req,res)=>{
    var data={name:req.query.yhname,mima:req.query.yhmima};
    yonghu.find(data,(err,data)=>{
        //console.log(data[0])
        //_doc.name
        if(data.length>=1){
            ejs.renderFile("yonghu.html",{returnVal5:"登录成功！欢迎进入体测成绩查询系统"},(err,str)=>{
                res.send(str)
            })
        }
        else{
            ejs.renderFile("yhdenglu.html",{returnVal3:"用户名或密码错误，请重新登录"},(err,str)=>{
                res.send(str)
            })
        }
    })
      
    
})

//管理员数据库设计
const schema2={
    name:String,
    mima:String
}
const guanli = mongoose.model('guanli', schema2);
const gl1 = new guanli({ name: "wxy",mima:"123456"})
gl1.save()

app.get("/gldenglu",(req,res)=>{
    var datagl={name:req.query.glname,mima:req.query.glmima};
    guanli.find(datagl,(err,datagl)=>{
        //console.log(datagl[0])
        //_doc.name
        if(datagl.length>=1){
            ejs.renderFile("guanli.html",{returnVal6:"登录成功！欢迎进入体测成绩查询系统"},(err,str)=>{
                res.send(str)
            })
        }
        else{
            ejs.renderFile("gldenglu.html",{returnVal4:"用户名或密码错误，请重新登录"},(err,str)=>{
                res.send(str)
            })
        }
    })
})

app.listen(10228)
