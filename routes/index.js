var express = require('express');
var router = express.Router();
var moment = require('moment-jalaali');
var Firebird = require('node-firebird');
var iconv = require('iconv-lite');


var fboption = {};
fboption.host = '192.168.100.4';
fboption.port = 3050;
fboption.database = 'USER';
fboption.user = 'SYSDBA';
fboption.password = 'masterkey';
fboption.characterset = 'UTF8';

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.redirect('../');
    /*
    res.render('index', {title: 'Express'});

     */
});

router.get('/logout', function (req, res, next) {
    req.session.auth = '';
    console.log(req.session);
    res.redirect('../');
    /*
    res.render('index', {title: 'Express'});
    
     */
});

router.use('*', function (req, res, next) {
    var usucsses = 0
    //console.log(req.body.username);
    //console.log(req.body.userpass);

    if (req.session.auth) {
        if (req.session.auth.usertype == '@') {
            console.log('admin');
            res.render('home', {
                title: 'SHAMSA Docs manager',
                pkgtitle: 'none',
                usertitle: req.session.auth.title
            });
        } else  {
            res.render('home', {
                title: 'SHAMSA Docs manager',
                pkgtitle: 'none',
                usertitle: req.session.auth.title
            });
        }
    }

    if(req.body.username) {
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            db.query('SELECT * FROM T_DOC_USER WHERE USERNAME=? AND USERPASS=?', [req.body.username, req.body.userpass], function (err, result) {
                //var enc_title = encoding.convert(result[0].TITLE, 'UTF8', 'WINDOWS-1256');
                //var chrset1 = charset(result[0].TITLE['content-type']);
                usucsses = result.length;
                console.log("count"+result);
                if (usucsses > 0) {
                    if (result[0].USERDISABLED == 1) {
                        res.render('index', {title: 'SHAMSA Order manager', alrt1: 'کاربری شما غیر فعال می باشد .'});
                    } else {
                        req.session.auth = {
                            uid: result[0].USER_UID.toString(),
                            title: result[0].TITLE,
                            superuser: result[0].ISSUPERVISOR,
                            usertype: result[0].USER_TYPE.toString()
                        };
                        console.log(req.session);
                        console.log(result[0].USER_TYPE.toString().substr(0, 1));
                        if (result[0].USER_TYPE.toString().substr(0, 1) == '@') {
                            console.log('admin');
                           res.redirect('../');
                            /*
                            res.render('home', {
                                title: 'SHAMSA Order manager',
                                pkgtitle: 'none',
                                usertitle: req.session.auth.title
                            });
                            */
                        } else {
                            res.redirect('../');
                            /*
                            res.render('home', {
                                title: 'SHAMSA Order manager',
                                pkgtitle: 'none',
                                usertitle: req.session.auth.title
                            });

                             */
                        }
                    }
                } else res.render('index', {
                    title: 'SHAMSA Docs manager',
                    alrt1: 'نام کاربری یا رمز عبور اشتباه می باشد .'
                });
                db.detach();
            });

        });
    } else {
        res.render('index', {title: 'SHAMSA Docs manager'});
    }

    //res.send("نام کاربری یا رمز عبور اشتباه می باشد ");

});



module.exports = router;
