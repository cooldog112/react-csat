const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const port = process.env.PORT || 5000;
const session = require('express-session')


app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());
app.use(session({
    //key 값
    secret: 'mykey',
    resave: false,
    saveUninitialized: true
}))

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();

function authIsOwner(req, res){
    if (req.session.is_logined){
        return true;
    }else{
        return false;
    }
}

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted=0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

//한명의 유저 정보 가져오기
app.get('/api/user/:id', (req, res)=>{
    let sql = 'SELECT * FROM USER WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.get('/api/report/:id', (req, res)=>{
    let sql = 'SELECT * FROM REPORT WHERE user_id= ? ORDER BY id DESC';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows[0]);
        }
    )
});

app.get('/api/person/:id', (req, res)=>{
    let sql = 'select id, user_id, period, applicant, candidate, absentee, created, updated from person where id in (select max(id) from person where user_id = ? group by period) order by period';
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows, fields)=>{
            console.log(rows);
            res.send(rows);
        })
});

app.post('/report/add', (req, res)=> {
    let sql = 'INSERT INTO REPORT(user_id, position, name, error, content) values(?, ?, ?, ?, ?)';
    let post = req.body;
    let params = [post.id, post.position, post.name, post.error, post.content];
    connection.query(sql, params,
        (err, rows, fields) => {
            console.log('rows', rows);
            console.log('err', err);
            if(err){
                res.send(false)
            }else{
                res.send(true)
            }
        }
    )
});

//로그인
app.post('/auth/login', (req, res)=>{
    let sql = 'SELECT * FROM USER WHERE account = ?';
    let post = req.body;
    let account = post.account;
    let password = post.password;
    let params = [account];


    connection.query(sql, params,
        (err, rows, fields)=>{
            if(rows[0].account === account && rows[0].password === password){
                req.session.is_logined = true;
                req.session.account = post.account;
                res.send(rows[0]);
            }else{
                res.send(false);
            }
        })

})

app.get('/auth/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.send('logout')
    })
})

app.get('/', (req, res, next) => {

    if(req.session.num === undefined){
        req.session.num = 1;
    }else{
        req.session.num = req.session.num + 1;
    }
    res.send(`Views :  ${req.session.num}`);
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));