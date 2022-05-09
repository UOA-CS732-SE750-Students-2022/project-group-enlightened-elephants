var express = require("express");
var db = require("mongoose");

var app = express();
//链接数据库
var link = db.createConnection("mongodb://localhost:27017/db");
link.on("open", function (err) {
    if (!err) {
        console.log("数据库连接成功！")
    } else {
        console.log(err);
    }
});

//评论模型
var commenS = new db.Schema({
    comment: {type: String},
    post_id: {type: String},
    user_id: {type:String},
    replied_id: {type:String},
    to_user_id: {type:String},
    create_time: {type:String},
    id: {type:String},

}, {collection: "commentS"});
//
var comment_model = link.model("commentS", commenS);

//接口
app.get("/get_comment", function (req, res) {//增
    comment_model.find((err, docs)=>{
        if(err){
            res.send(err)    //这边err就是请求失败或者错误的情况 res.send就会把他发送的前台
        }else{
            res.send(docs)//doc 是成功以后的数据
        }
    });
});

app.get("/add_comment", function (req, res) {//增
    var comment = req.query.comment;
    var post_id = req.query.post_id;
    var user_id = req.query.user_id;
    var replied_id = req.query.replied_id;
    var to_user_id = req.query.to_user_id;
    var create_time = req.query.create_time;
    var id = req.query.id;
    model = new comment_model({comment:comment,post_id:post_id,user_id:user_id,replied_id:replied_id,to_user_id:to_user_id,create_time:create_time,id:id})
    model.save(function(err,doc){
        if(err){
            res.send(err)    //这边err就是请求失败或者错误的情况 res.send就会把他发送的前台
        }else{      
            res.send(doc)//doc 是成功以后的数据
        }
    })
});


/**模型.find({查询条件}, (err, data)=>{回调函数}) */





app.listen(8084)
