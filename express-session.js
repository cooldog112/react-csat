const express = require('express')
const bodyParser = require('body-parser');
const parseurl = require('parseurl')
const session = require('express-session')
const port = process.env.PORT || 5000;
const app = express()

const authData = {
    account : '매천고',
    password : '1234'
}

app.use(session({
    //key 값
    secret: 'mykey',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());

app.get('/auth/login', (req, res)=>{

})

app.post('/auth/login', (req, res)=>{
    console.log(req.body);
    const post = req.body;
    let account = post.account;
    let password = post.password;
    if(account === authData.account  && password === authData.password){
        res.send('로그인 성공');
    }else{
        res.send('No');
    }
})

app.get('/', function (req, res, next) {

    if(req.session.num === undefined){
        req.session.num = 1;
    }else{
        req.session.num = req.session.num + 1;
    }
    res.send(`Views :  ${req.session.num}`);
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));