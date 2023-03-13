var express = require('express');
var multer = require('multer');
var alert = require('alert');
var multiparty = require('multiparty');
var form = new multiparty.Form();
var path = require('path');

var db = require('../../models/db');
var sql = require('../../models/sql');
var login_failed = require('../../models/login_failed');

var router = express.Router();

var upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
})});

db.executeUpdate(sql.createItemTable());

router.get('/iteminsert', (req, res)=>{
    login_failed.loginCheck(res, req.session.userId);
    res.render('iteminsert');
});

router.get('/itemselect', async (req, res)=>{
    login_failed.loginCheck(res, req.session.userId);
    try{
        const rows = await db.executeSelect(sql.selectAllItem());
        // if(rows.length > 0){
            res.render('itemselect.ejs', { rows: rows });
        // } 
    } catch(err){
        console.log(err);
    }
});

router.post('/iteminsert', upload.single('image'), async (req, res)=>{
    const {itemName, price} = req.body;
    db.executeUpdate(sql.insertItem(itemName, req.file.filename, price));
    res.redirect('/registration/itemselect');
});

router.post('/itemselect', async (req, res)=>{
    
});


router.get('/', (req, res) => {
    res.redirect('/registration/iteminsert');
});

module.exports = router;