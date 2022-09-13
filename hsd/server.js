const express = require('express');
const path = require('path');
const app = express();
var mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'react/build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var con = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : '03290329',
  database : 'clone_hansot'
});



const http = require('http').createServer(app);

let id ='';
let pw ='';

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM member", function (err, result, fields) {
      if (err) throw err;
      //console.log('유저',result);
    });
    
});

app.post('/login', function(req, res){
  console.log("post"); 
  id=req.body.id;
  pw=req.body.pw;
  let cnt = 0;
  let query = "select count(*) cnt from member where id='"+ id +"' and password='"+pw+"'";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    if(result[0].cnt> 0){
      console.log("로그인 성공");
      cnt =result[0].cnt;
      res.send({id:id, cnt:cnt});
    }
  });
})

app.post('/menu', function(req, res){
  let query = "select * from menu";
  let items = [];
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    for(var i = 0; i< result.length; i++){
      items.push(result[i]);
    }
    res.send(items);
  });
})

app.post('/category', function(req, res){
  let title = [];
  let query = "select c.title title, c2.title subtitle, c2.category_id from category c, category c2 where c.category_id = c2.parent;";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    for(var i = 0; i< result.length; i++){
      title.push({ title:result[i].title, subtitle:result[i].subtitle, categoryid:result[i].category_id});
    }
    res.send(title);
    //console.log(title);
  });
})

app.post()

app.get('/get', function(req, res){
  console.log("get"); 
  res.sendFile(path.join(__dirname, 'react/build/index.html') );
})

// app.post('/post', function(req, res){
//   req.body.
// })



// 8080번 포트에서 서버를 실행할거야
app.listen(8080, () => {
  // 서버가 정상적으로 실행되면 콘솔창에 이 메시지를 띄워줘
  console.log("Listening on 8080");
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'react/build/index.html') );
})