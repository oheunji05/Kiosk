var express = require('express');
var multer = require('multer');

var alert = require('alert');
var multiparty = require('multiparty');
var form = new multiparty.Form();

var path = require('path');

var db = require('../../models/db');
var sql = require('../../models/sql');

var login_failed = require('../../models/login_failed');

var upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
})});

var router = express.Router();

router.get('/delete', (req, res) => {
    db.executeUpdate(sql.deleteAllItem());
    res.redirect('/registration/itemselect');
});

router.post('/deleteitem', (req, res) => {
    const {itemName} = req.body;
    db.executeUpdate(sql.deleteItem(itemName));
    res.redirect('/registration/itemselect');
});

router.post('/', (req, res) => {
    const {itemName, image, price} = req.body;
    login_failed.loginCheck(res, req.session.userId);
    res.render('edititem.ejs', {itemName: itemName, image: image, price: price});
});

router.post('/edit', upload.single('image'), (req, res) => {
    const {itemName, itemName_, imageForNull, price} = req.body;
    login_failed.loginCheck(res, req.session.userId);
    if(req.file == undefined){
        db.executeUpdate(sql.updateItem(itemName_, itemName, imageForNull, price));
    }
    else{
        db.executeUpdate(sql.updateItem(itemName_, itemName, req.file.filename, price));
    }
    res.redirect('/registration/itemselect');
});

module.exports = router;