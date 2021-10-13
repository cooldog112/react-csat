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
app.get('/api/schoolReport', (req, res)=>{
    connection.query(
        "select report.id as id, user_id, position, name, error, account from report join user where report.user_id = user.id and report.id in (select max(id) from report group by user_id) order by user_id;",
        (err, rows, fields) =>{
            res.send(rows);
        }
    )
})
app.get('/api/schoolPerson1', (req, res)=>{
    connection.query(
        "select person.id as id, user_id, applicant, candidate, other, absentee, person.created as created, person.updated as updated, account from person join user where period = 1 and person.user_id = user.id and person.id in (select max(id) from person where period=1 group by user_id) order by user_id;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/schoolPerson2', (req, res)=>{
    connection.query(
        "select person.id as id, user_id, applicant, candidate, other, absentee, person.created as created, person.updated as updated, account from person join user where period = 2 and person.user_id = user.id and person.id in (select max(id) from person where period=2 group by user_id) order by user_id;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/schoolPerson3', (req, res)=>{
    connection.query(
        "select person.id as id, user_id, applicant, candidate, other, absentee, person.created as created, person.updated as updated, account from person join user where period = 3 and person.user_id = user.id and person.id in (select max(id) from person where period=3 group by user_id) order by user_id;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/schoolPerson4', (req, res)=>{
    connection.query(
        "select person.id as id, user_id, applicant, candidate, other, absentee, person.created as created, person.updated as updated, account from person join user where period = 4 and person.user_id = user.id and person.id in (select max(id) from person where period=4 group by user_id) order by user_id;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/schoolPerson5', (req, res)=>{
    connection.query(
        "select person.id as id, user_id, applicant, candidate, other, absentee, person.created as created, person.updated as updated, account from person join user where period = 5 and person.user_id = user.id and person.id in (select max(id) from person where period=5 group by user_id) order by user_id;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/total', (req, res)=>{
    connection.query(
        "select year, period, applicant, candidate, absentee from total union all select '2022', period, sum(applicant) as applicant, sum(candidate) as candidate, sum(absentee) as absentee from (select * from (select * from person order by id desc limit 100000)b group by period, user_id order by period, user_id)a group by period order by period, year desc;",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
app.get('/api/reportChart', (req, res)=>{
    connection.query(
        "select error, count(error) as cnt from report where id in (select max(id) from report group by user_id) group by error order by error;",
        (err, rows, fileds) => {
            res.send(rows);

        }
    );
});
app.get('/api/personChart/:period', (req, res)=>{
    let sql = "select period, sum(applicant) as applicant, sum(candidate) as candidate, sum(absentee) as absentee from person where period=? and id in (select max(id) from person where period=? group by user_id);";
    let params = [req.params.period, req.params.period];
    connection.query(sql, params,
        (err, rows, fileds)=>{
            res.send(rows);
        }
    );
});

//한명의 유저 정보 가져오기
app.get('/api/user/:id', (req, res)=>{
    let sql = 'SELECT * FROM user WHERE id = ?;';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows[0]);
        }
    )
});
app.get('/api/report', (req, res)=>{
    let sql = 'SELECT * FROM report WHERE user_id= ? ORDER BY id DESC;';
    let params = [req.session.user_id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows[0]);
        }
    )
});

app.get('/api/person', (req, res)=>{
    let sql = 'select id, user_id, period, applicant, candidate, absentee, other, created, updated from person where id in (select max(id) from person where user_id = ? group by period) order by period;';
    let params = [req.session.user_id];
    connection.query(sql, params,
        (err,rows, fields)=>{
            console.log(rows);
            res.send(rows);
        })
});

app.post('/report/add', (req, res)=> {
    let sql = 'INSERT INTO report(user_id, position, name, error, content) values(?, ?, ?, ?, ?);';
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

app.post('/person/add', (req, res)=> {
    let selectSql = 'select id, user_id, period, applicant, candidate, absentee, created, other, updated from person where id in (select max(id) from person where user_id = ? and period = ?);';
    let selectParams = [req.body.id, req.body.period];
    let post = req.body;
    let applicant='';
    connection.query(selectSql, selectParams,
        (err,rows, fields)=>{
            if(rows){
                applicant = rows[0].applicant;
                let sql = 'INSERT INTO person(user_id, period, applicant, candidate, other, absentee) values(?, ?, ?, ?, ?, ?);';
                let params = [post.id, post.period, applicant, req.body.candidate, req.body.other, req.body.absentee];
                console.log("params : " + params);
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
            }else{
                console.log("err")
                // res.send(true);
            }
        });


});


//로그인
app.post('/auth/login', (req, res)=>{
    let sql = 'SELECT * FROM user WHERE account = ?;';
    let post = req.body;
    let account = post.account;
    let password = post.password;
    let params = [account];


    connection.query(sql, params,
        (err, rows, fields)=>{
            if(rows[0].account === account && rows[0].password === password){
                req.session.is_logined = true;
                req.session.account = post.account;
                req.session.user_id = rows[0].id;
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

app.get('/userInfo', (req, res, next) => {
    if(req.session.is_logined === false){
        res.send(`세션정보 없음`)
    }else{
        let sql = 'SELECT * FROM user WHERE id = ?;';
        let params = [req.session.user_id];
        connection.query(sql, params,
            (err, rows, fields)=>{
                if(rows){
                    res.send(rows);
                }else{
                    res.send(false);
                }
            })
    }
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));