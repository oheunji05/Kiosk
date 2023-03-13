var express = require('express');
var alert = require('alert');
var pbkdf2 = require('../modules/pbkdf2');

var db = require('../models/db');
var sql = require('../models/sql');

var router = express.Router();
db.executeUpdate(sql.createUserTable());

router.get('/signin', (req, res)=>{
    if(req.session.userId == undefined){
        res.render('signin');
    }
    else{
        res.redirect('/manager');
    }
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signin', async (req, res)=>{
    const {userId, password} = req.body;
    try{
        const rows = await db.executeSelect(sql.selectUserById(userId));
        if(rows.length > 0){
            const salt = rows[0].salt;
            const key = await pbkdf2.getKey(password, salt);
            if(key == rows[0].password){ // 로그인 성공
                alert('Login 성공');
                req.session.userId = userId;
                req.session.save(err => {
                    if (err) throw err;
                    res.redirect('/');
                });
            }
            else{
                alert('Login 실패');
            }
        } 
    } catch(err){
        alert(err);
    }
});

router.post('/signup', async (req, res)=>{
    const {userId, password} = req.body;
    const salt = await pbkdf2.getSalt();
    const key = await pbkdf2.getKey(password, salt);
    db.executeUpdate(sql.insertUser(userId, key, salt));
    res.redirect('/');
});

router.get('/signout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    });
});

/* GET home page. */
router.get('/key', async (req, res) => {
    if(req.query.password == undefined) res.json();
    const salt = await pbkdf2.getSalt();
    const key = await pbkdf2.getKey(req.query.password, salt);
    res.json({salt:salt, key:key});
  
});

module.exports = router;