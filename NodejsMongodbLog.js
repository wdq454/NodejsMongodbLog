const express =require("express")
const app=express()
const mongoose = require('mongoose');
const ejs=require('ejs')

mongoose.connect('mongodb://localhost:27017/180110910228');

app.use('/',express.static('public'))

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
//跳转到管理员页面
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

//体测成绩数据库设计
const schema3={
    name:String,
    xuehao:String,
    run8:String,
    run5:String,
    ty:String,
    ywqz:String,
    tqq:String
}
const tice = mongoose.model('tice', schema3);

//录入
app.get("/luru",(req,res)=>{
    if(req.query.xingming==""||req.query.xuehao==""){
        ejs.renderFile("guanli.html",{returnVal6:"录入失败！姓名、学号不可为空"},(err,str)=>{
            res.send(str)
        })
    }
    else{
        const tc1 = new tice({ name: req.query.xingming,xuehao:req.query.xuehao,run8:req.query.run8,run5:req.query.run5,
            ty:req.query.ty,ywqz:req.query.ywqz,tqq:req.query.tqq});
            tc1.save()
            ejs.renderFile("guanli.html",{returnVal6:"录入成功！"},(err,str)=>{
                res.send(str)
            })
    }
    
})

//查询
app.get("/chaxun",(req,res)=>{
    if(req.query.xingming==""||req.query.xuehao==""){
        ejs.renderFile("yonghu.html",{returnVal5:"查询失败！姓名和学号不可为空"},(err,str)=>{
            res.send(str)
        })
    }
    else{
        var xmdata=req.query.xingming;
        var xhdata=req.query.xuehao;
        tice.find({name:xmdata,xuehao:xhdata},(err,data)=>{
            console.log(data[0]._doc.name)
            //_doc.name
            ejs.renderFile("chaxun.html",{returnVal7:"查询成功！",val1:data[0]._doc.name,
            val2:data[0]._doc.xuehao,val3:data[0]._doc.run8,val4:data[0]._doc.run5,
            val5:data[0]._doc.ty,val6:data[0]._doc.ywqz,val7:data[0]._doc.tqq,},(err,str)=>{
                res.send(str)
            })
        })
    }
})

//返回
app.get("/fanhui",(req,res)=>{
    ejs.renderFile("yonghu.html",{returnVal5:"欢迎进入体测成绩查询系统"},(err,str)=>{
        res.send(str)
    })
})

app.listen(10228)
