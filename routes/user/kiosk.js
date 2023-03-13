var express = require('express');

var db = require('../../models/db');
var sql = require('../../models/sql');

var login_failed = require('../../models/login_failed');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res)=>{
    try{
        const rows = await db.executeSelect(sql.selectAllItem());
        // if(rows.length > 0){
            res.render('kiosk.ejs', { rows: rows });
        // } 
    } catch(err){
        console.log(err);
    }
});

module.exports = router;
