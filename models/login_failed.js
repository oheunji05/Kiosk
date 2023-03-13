var alert = require('alert');

exports.loginCheck = (res, userId) => {
    if(userId===undefined){
        alert('접근 불가합니다');
        res.redirect('/');
    }
}