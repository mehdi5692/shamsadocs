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

/* GET users listing. */
router.get('/page1', function (req, res, next) {
    res.render('pages/page1', {title: 'Docs'});
});
router.get('/page2', function (req, res, next) {
    res.render('pages/page2', {title: 'Docs'});
});
router.get('/page3', function (req, res, next) {
    res.render('pages/page6', {title: 'Docs'});
});
router.get('/page4', function (req, res, next) {
    res.render('pages/page9', {title: 'Docs'});
});
router.get('/page5', function (req, res, next) {
    res.render('pages/page5', {title: 'Docs'});
});
router.get('/page7', function (req, res, next) {
    res.render('pages/page7', {title: 'Docs'});
});
router.get('/page8', function (req, res, next) {
    res.render('pages/page8', {title: 'Docs'});
});

////////////////////////////////////////////////////
router.get('/dashbord', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var person = null;
        var docs = null;
        var send = null;
        var recive = null;
        var js;
        var js2;

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT COUNT(ID)AS COUNT_PERSON  FROM T_DOC_PERSONS";
            db.query(sql1, function (err, result) {
                if(err)
                    throw err;
                person = result[0].COUNT_PERSON;
                console.log(result[0]);
                Firebird.attach(fboption, function (err, db) {
                    if (err)
                        throw err;
                    var sql1 = "SELECT COUNT(ID)AS COUNT_DOCS  FROM T_DOC_NAME";
                    db.query(sql1, function (err, result) {
                        if(err)
                            throw err;
                        docs = result[0].COUNT_DOCS;

                        Firebird.attach(fboption, function (err, db) {
                            if (err)
                                throw err;
                            var sql1 = "SELECT COUNT(DOC_ID)AS COUNT_SEND  FROM T_DOC_SEND";
                            db.query(sql1, function (err, result) {
                                if(err)
                                    throw err;
                                send = result[0].COUNT_SEND;

                                Firebird.attach(fboption, function (err, db) {
                                    if (err)
                                        throw err;
                                    var sql1 = "SELECT COUNT(DOC_ID)AS COUNT_RECIVE FROM T_DOC_RECIVE";
                                    db.query(sql1, function (err, result) {
                                        if(err)
                                            throw err;
                                        recive = result[0].COUNT_RECIVE;
                                        js = '{"person":"' + person + '", "docs":"' + docs + '", "send":"' + send +'", "recive":"' + recive + '"}';
                                        js2 = JSON.parse(js);
                                        res.json(js2);
                                        db.detach();
                                    });
                                });

                                db.detach();
                            });
                        });

                        db.detach();
                    });
                });
                db.detach();
            });
        });
    }
});


router.get('/docs', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM V_DOC_LIST1";
            db.query(sql1, function (err, result) {
                res.json(result);
                db.detach();
            });
        });
    }
});

router.get('/persons', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM T_DOC_PERSONS ORDER BY LASTNAME";
            db.query(sql1, function (err, result) {
                res.json(result);
                db.detach();
            });
        });
    }
});

router.post('/add_doc', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var doc_id = numreplace(req.body.id);
        console.log(doc_id);
        var arrey = doc_id.split("-");
        var doc_year = arrey[1];
        var doc_num = numreplace(req.body.doc_num);
        console.log(doc_num);
        var doc_date = req.body.doc_date.substr(0, 10);
        var js;
        var js2;
        if (doc_year.length == 4){
            Firebird.attach(fboption, function (err, db) {
                if (err)
                    throw err;
                var sql1 = "SELECT * FROM T_DOC_NAME WHERE ID = '" + doc_id + "'";
                //console.log(sql1);
                db.query(sql1, function (err, result) {
                    //console.log(result[0]);
                    if (result[0]) {
                        console.log("true");
                        js = '{"msg":"duplicate"}';
                        js2 = JSON.parse(js);
                        res.json(js2);
                    } else {
                        console.log("false");
                        Firebird.attach(fboption, function (err, db) {
                            if (err)
                                throw err;
                            var sql1 = "INSERT INTO T_DOC_NAME (ID, DOC_NUM, DOC_DATE, DOC_ACT, DOC_USER_ID, DOC_YEARS)\n" +
                                "            VALUES('" + doc_id + "', '" + doc_num + "', '" + doc_date + "', 0, 'fuDqLqklej', '" + doc_year + "')";
                            console.log(sql1);
                            db.query(sql1, function (err, result) {
                                console.log(result);
                                js = '{"msg":"sucsses"}';
                                js2 = JSON.parse(js);
                                res.json(js2);
                                db.detach();
                            });
                        });
                    }
                    // console.log("none");
                    db.detach();
                });
            });
        } else {
            console.log("none");
            js = '{"msg":"exit docs"}';
            js2 = JSON.parse(js);
            res.json(js2);
        }

    }
    function numreplace (num) {
        num = num.replace(/۱/g, "1");
        num = num.replace(/۲/g, "2");
        num = num.replace(/۳/g, "3");
        num = num.replace(/۴/g, "4");
        num = num.replace(/۵/g, "5");
        num = num.replace(/۶/g, "6");
        num = num.replace(/۷/g, "7");
        num = num.replace(/۸/g, "8");
        num = num.replace(/۹/g, "9");
        num = num.replace(/۰/g, "0");
        return num;
    };
});

router.post('/add_person', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var person_name = req.body.person_name;
        //console.log("name:" + person_name);
        var person_famili = req.body.person_famili;
        // console.log("famili:" + person_famili);
        var person_comment = req.body.person_comment;
        // console.log("comment:" + person_comment);
        var js;
        var js2;

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM SP_B60UID";
            //console.log(sql1);
            db.query(sql1, function (err, result) {
                console.log(result[0]);
                // if (result[0].UID) var uid = JSON.stringify(result[0].UID.toString());
                // console.log(uid);
                if (result[0]) {
                    console.log("true");
                    Firebird.attach(fboption, function (err, db) {
                        if (err)
                            throw err;
                        var sql1 = "INSERT INTO T_DOC_PERSONS (ID, FIRSTNAME, LASTNAME, COMMENT)\n" +
                            "            VALUES('" + result[0].UID + "', '" + person_name + "', '" + person_famili + "', '" + person_comment + "')";
                        // console.log(sql1);
                        db.query(sql1, function (err, result) {
                            if (err)
                                throw err;
                            console.log(result);
                            js = '{"msg":"sucsses"}';
                            js2 = JSON.parse(js);
                            res.json(js2);
                            db.detach();
                        });
                    });
                }
                // console.log("none");
                db.detach();
            });
        });
    }
});

router.post('/add_send_person', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var person_id = req.body.person_id;
        console.log("name:" + person_id);
        var send_date = req.body.send_date.substr(0, 10);
        console.log("famili:" + send_date);
        var js;
        var js2;

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM SP_B60UID";
            //console.log(sql1);
            db.query(sql1, function (err, result) {
                console.log(result[0]);
                // if (result[0].UID) var uid = JSON.stringify(result[0].UID.toString());
                // console.log(uid);
                if (result[0]) {
                    console.log("true");
                    var send_id = result[0].UID;
                    Firebird.attach(fboption, function (err, db) {
                        if (err)
                            throw err;
                        var sql1 = "INSERT INTO T_DOC_SEND_PERSON (ID, USER_ID, SEND_DATE)\n" +
                            "            VALUES('" + result[0].UID + "', '" + person_id + "', '" + send_date + "')";
                        // console.log(sql1);
                        db.query(sql1, function (err, result) {
                            if (err)
                                throw err;
                            console.log(result);
                            // js = '{"msg":"sucsses"}';
                            // js2 = JSON.parse(js);
                            // res.json(js2);

                            Firebird.attach(fboption, function (err, db) {
                                if (err)
                                    throw err;
                                var sql1 = "SELECT TDSP.ID, TDP.FIRSTNAME, TDP.LASTNAME, TDSP.SEND_DATE, TDSP.USER_ID FROM T_DOC_SEND_PERSON TDSP \n" +
                                "           LEFT JOIN T_DOC_PERSONS TDP ON TDP.ID = TDSP.USER_ID \n" +
                                "           WHERE TDSP.ID = '" + send_id +"'";
                                console.log(sql1);
                                db.query(sql1, function (err, result) {
                                    if (result) {
                                        console.log(result);
                                        res.json(result[0]);
                                    }
                                    db.detach();
                                });
                            });

                            db.detach();
                        });
                    });
                }
                // console.log("none");
                db.detach();
            });
        });
    }
});

router.post('/add_send_doc', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var send_id = req.body.send_id;
        // console.log("send_id:" + send_id);
        var user_id = req.body.user_id;
        // console.log(user_id);
        var doc_id = numreplace(req.body.doc_id);
        // console.log("doc_id:" + doc_id);
        var js;
        var js2;
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM V_DOC_LIST1 WHERE ID = '" + doc_id + "'";
            // console.log(sql1);
            db.query(sql1, function (err, result) {
                if (err)
                    throw err;
                console.log(result);
                if (result[0]) {
                    if (result[0].DOC_ACT == '0'){
                        Firebird.attach(fboption, function (err, db) {
                            if (err)
                                throw err;
                            var sql1 = "INSERT INTO T_DOC_SEND (SEND_ID, DOC_ID, DOC_ACT)\n" +
                                "            VALUES('" + send_id + "', '" + doc_id + "', 1)";
                            // console.log(sql1);
                            db.query(sql1, function (err, result) {
                                if (err)
                                    throw err;
                                Firebird.attach(fboption, function (err, db) {
                                    if (err)
                                        throw err;
                                    var sql1 = "UPDATE T_DOC_NAME SET DOC_ACT = 1, DOC_USER_ID = '" + user_id + "' WHERE ID = '" + doc_id + "'";
                                    // console.log(sql1);
                                    db.query(sql1, function (err, result) {
                                        if (err)
                                            throw err;
                                        console.log(result);
                                        js = '{"msg":"sucsses"}';
                                        js2 = JSON.parse(js);
                                        res.json(js2);

                                        db.detach();
                                    });
                                });
                                console.log(result);
                                db.detach();
                            });
                        });
                    } else {
                        js = '{"msg":"doc exit"}';
                        js2 = JSON.parse(js);
                        res.json(js2);
                    }
                    console.log(result);

                } else {
                    js = '{"msg":"no doc"}';
                    js2 = JSON.parse(js);
                    res.json(js2);
                }
                db.detach();
            });
        });

    }
    function numreplace (num) {
        num = num.replace(/۱/g, "1");
        num = num.replace(/۲/g, "2");
        num = num.replace(/۳/g, "3");
        num = num.replace(/۴/g, "4");
        num = num.replace(/۵/g, "5");
        num = num.replace(/۶/g, "6");
        num = num.replace(/۷/g, "7");
        num = num.replace(/۸/g, "8");
        num = num.replace(/۹/g, "9");
        num = num.replace(/۰/g, "0");
        return num;
    };
});

router.post('/send_doc_list', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var send_id = req.body.send_id;
        console.log("name:" + send_id);


        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM V_DOC_SEND WHERE SEND_ID = '" + send_id + "'";
            // console.log(sql1);
            db.query(sql1, function (err, result) {
                if (err)
                    throw err;
                if (result) {
                    console.log(result);
                    res.json(result);
                }
                db.detach();
            });
        });
    }
});

router.get('/send_list', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT ID, USER_ID, SEND_DATE, DOC_ACT1, DOC_ACTED, FIRST_NAME|| ' ' ||LAST_NAME AS FULLNAME  FROM V_DOC_SEND_LIST";
            db.query(sql1, function (err, result) {
                res.json(result);
                db.detach();
            });
        });
    }
});

router.post('/add_doc_recive', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var doc_id = numreplace(req.body.id);
        console.log(doc_id);
        var recive_date = req.body.recive_date.substr(0, 10);
        var js;
        var js2;
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM T_DOC_NAME WHERE ID = '" + doc_id + "'";
            // console.log(sql1);
            db.query(sql1, function (err, result) {
                if (err)
                    throw err;
                console.log(result);
                if (result[0]) {
                    if (result[0].DOC_ACT == 1){
                        Firebird.attach(fboption, function (err, db) {
                            if (err)
                                throw err;
                            var sql1 = "INSERT INTO T_DOC_RECIVE (USER_ID, DOC_ID, RECIVE_DATA)\n" +
                                "            VALUES('" + result[0].DOC_USER_ID + "', '" + doc_id + "', '" + recive_date + "')";
                            // console.log(sql1);
                            db.query(sql1, function (err, result) {
                                if (err)
                                    throw err;
                                Firebird.attach(fboption, function (err, db) {
                                    if (err)
                                        throw err;
                                    var sql1 = "UPDATE T_DOC_NAME SET DOC_ACT = 0, DOC_USER_ID = 'fuDqLqklej' WHERE ID = '" + doc_id + "'";
                                    // console.log(sql1);
                                    db.query(sql1, function (err, result) {
                                        if (err)
                                            throw err;
                                        console.log(result);
                                        Firebird.attach(fboption, function (err, db) {
                                            if (err)
                                                throw err;
                                            var sql1 = "UPDATE T_DOC_SEND SET DOC_ACT = 0 WHERE DOC_ID = '" + doc_id + "' AND DOC_ACT = 1";
                                            // console.log(sql1);
                                            db.query(sql1, function (err, result) {
                                                if (err)
                                                    throw err;
                                                console.log(result);
                                                js = '{"msg":"sucsses"}';
                                                js2 = JSON.parse(js);
                                                res.json(js2);

                                                db.detach();
                                            });
                                        });

                                        db.detach();
                                    });
                                });
                                console.log(result);
                                db.detach();
                            });
                        });
                    } else {
                        js = '{"msg":"doc exit"}';
                        js2 = JSON.parse(js);
                        res.json(js2);
                    }
                    console.log(result);

                } else {
                    js = '{"msg":"no doc"}';
                    js2 = JSON.parse(js);
                    res.json(js2);
                }
                db.detach();
            });
        });
    }
    function numreplace (num) {
        num = num.replace(/۱/g, "1");
        num = num.replace(/۲/g, "2");
        num = num.replace(/۳/g, "3");
        num = num.replace(/۴/g, "4");
        num = num.replace(/۵/g, "5");
        num = num.replace(/۶/g, "6");
        num = num.replace(/۷/g, "7");
        num = num.replace(/۸/g, "8");
        num = num.replace(/۹/g, "9");
        num = num.replace(/۰/g, "0");
        return num;
    };
});

router.get('/recives', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM V_DOC_RECIVE_LIST ";
            // console.log(sql1);
            db.query(sql1, function (err, result) {
                if (err)
                    throw err;
                if (result) {
                    console.log(result);
                    res.json(result);
                }
                db.detach();
            });
        });
    }
});

router.post('/kala_detail', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var gd_uid = JSON.parse(req.body.kid);
        console.log(gd_uid);
        //res.send(req.body.kid);

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT * FROM T_DOC_NAME";
            db.query(sql1, [JSON.parse(req.body.kid)], function (err, result) {
                if (result) {
                    res.json(result);
                }
                db.detach();
            });
        });

    }
});
router.post('/plane', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var cty = req.body.cty;
        var date10 = req.body.date1 + ' 00:00:00';
        var date11 = req.body.date1 + ' 23:59:59';
        // console.log(cty);
        // console.log(date10);
        // console.log(date11);

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT \n" +
                "    MSPH.HOT_UID,   \n" +
                "    MAX(TH.HOT_NAME) AS HOT_NAME,\n" +
                "    MAX(TH.HOT_ID) AS HOT_ID,\n" +
                "    MAX(TH.HOT_LATITUDE) AS HOT_LATITUDE,\n" +
                "    MAX(TH.HOT_LONGITUDE) AS HOT_LONGITUDE,\n" +
                "    COUNT(MSP.MSP_UID) AS COUNT_GROUP,        \n" +
                "    SUM(MSPM1.MSPM_PAG_1) AS ADLM,\n" +
                "    SUM(MSPM1.MSPM_PAG_2) AS CHDM,\n" +
                "    SUM(MSPM1.MSPM_PAG_4) AS INFM,\n" +
                "    SUM(MSPMF.MSPM_PAG_1) AS ADLF,\n" +
                "    SUM(MSPMF.MSPM_PAG_2) AS CHDF,\n" +
                "    SUM(MSPMF.MSPM_PAG_4) AS INFF,\n" +
                "    SUM(MSP.MSPL_PAG_1) AS ADL,\n" +
                "    SUM(MSP.MSPL_PAG_2) AS CHD,\n" +
                "    SUM(MSP.MSPL_PAG_4) AS INF,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_1 IS NOT NULL, MSPMF.MSPM_PAG_1, IIF(MSPM1.MSPM_PAG_1 IS NOT NULL, MSPM1.MSPM_PAG_1, MSP.MSPL_PAG_1))) AS ADLS,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_2 IS NOT NULL, MSPMF.MSPM_PAG_2, IIF(MSPM1.MSPM_PAG_2 IS NOT NULL, MSPM1.MSPM_PAG_2, MSP.MSPL_PAG_2))) AS CHDS,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_4 IS NOT NULL, MSPMF.MSPM_PAG_4, IIF(MSPM1.MSPM_PAG_4 IS NOT NULL, MSPM1.MSPM_PAG_4, MSP.MSPL_PAG_4))) AS INFS\n" +
                "FROM TBAS_MASTER_PLAN_CITIES MSPC \n" +
                "LEFT JOIN TBAS_MASTER_PLAN_ENROLLMENT MSP ON MSP.MSP_UID = MSPC.MSP_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_MANIFEST_FINAL MSPMF ON MSPMF.MSP_UID = MSP.MSP_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_CITIES MSPC1 ON MSPC1.MSP_UID = MSP.MSP_UID AND MSPC1.MSPH_ORDER = 1\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_MANIFEST MSPM1 ON MSPM1.MSPH_UID = MSPC1.MSPH_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_HOTELS MSPH ON MSPH.MSPH_UID = MSPC.MSPH_UID\n" +
                "LEFT JOIN TBAS_HOTELS TH ON TH.HOT_UID = MSPH.HOT_UID\n" +
                "WHERE MSPC.MSPH_ENTER >= '" + date10 + "' AND MSPC.MSPH_ENTER <= '" + date11 + "' AND MSPC.CTY_UID = '" + cty + "' AND MSPC.MSPH_NIGHTS > 1 AND MSP.MSPL_BAJ IS NOT NULL AND MSP.MSPL_MANIFEST IS NOT NULL\n" +
                "GROUP BY MSPH.HOT_UID";
            //console.log(sql1);

            db.query(sql1, function (err, result) {

                for (var i = 0; i < result.length; i++) {
                    if (result[i].HOT_UID) result[i].HOT_UID = JSON.stringify(result[i].HOT_UID.toString());
                    if (result[i].HOT_NAME) result[i].HOT_NAME = iconv.decode(result[i].HOT_NAME, 'WINDOWS-1256');
                }
                res.json(result);
                db.detach();
            });

        });

    }
});
router.post('/hotel', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var hot = JSON.parse(req.body.hid);
        console.log('///////////////////////////////////////////////////////////');
        console.log(hot);
        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql10 = "SELECT HOT_NAME,   \n" +
                "    HOT_ID,\n" +
                "    HOT_ADDRESS,\n" +
                "    HOT_LATITUDE,\n" +
                "    HOT_LONGITUDE,\n" +
                "    HOT_DISTRICT,        \n" +
                "    HOT_CARAVANS_CAP,\n" +
                "    HOT_HARAM_DISTANCE_M,\n" +
                "    HOT_HARAM_DISTANCE_TITLE\n" +
                "FROM TBAS_HOTELS WHERE HOT_UID=?";
            //console.log(sql1);

            db.query(sql10, [hot], function (err, result) {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].HOT_NAME) result[i].HOT_NAME = iconv.decode(result[i].HOT_NAME, 'WINDOWS-1256');
                        if (result[i].HOT_ADDRESS) result[i].HOT_ADDRESS = iconv.decode(result[i].HOT_ADDRESS, 'WINDOWS-1256');
                    }
                }
                res.json(result);
                db.detach();
            });

        });

    }
});
router.post('/plane2', function (req, res, next) {
    console.log(req.session.auth);
    if (req.session.auth) {
        console.log('OK');
        var hot = JSON.parse(req.body.hid);
        var date10 = req.body.date1 + ' 00:00:00';
        var date11 = req.body.date1 + ' 23:59:59';
        // console.log(cty);
        // console.log(date10);
        // console.log(date11);

        Firebird.attach(fboption, function (err, db) {
            if (err)
                throw err;
            var sql1 = "SELECT \n" +
                "    MSPH.HOT_UID,   \n" +
                "    MSPC.MSPH_NIGHTS,   \n" +
                "    MAX(TH.HOT_NAME) AS HOT_NAME,\n" +
                "    MAX(TH.HOT_ID) AS HOT_ID,\n" +
                "    MAX(TH.HOT_LATITUDE) AS HOT_LATITUDE,\n" +
                "    MAX(TH.HOT_LONGITUDE) AS HOT_LONGITUDE,\n" +
                "    COUNT(MSP.MSP_UID) AS COUNT_GROUP,        \n" +
                "    SUM(MSPM1.MSPM_PAG_1) AS ADLM,\n" +
                "    SUM(MSPM1.MSPM_PAG_2) AS CHDM,\n" +
                "    SUM(MSPM1.MSPM_PAG_4) AS INFM,\n" +
                "    SUM(MSPMF.MSPM_PAG_1) AS ADLF,\n" +
                "    SUM(MSPMF.MSPM_PAG_2) AS CHDF,\n" +
                "    SUM(MSPMF.MSPM_PAG_4) AS INFF,\n" +
                "    SUM(MSP.MSPL_PAG_1) AS ADL,\n" +
                "    SUM(MSP.MSPL_PAG_2) AS CHD,\n" +
                "    SUM(MSP.MSPL_PAG_4) AS INF,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_1 IS NOT NULL, MSPMF.MSPM_PAG_1, IIF(MSPM1.MSPM_PAG_1 IS NOT NULL, MSPM1.MSPM_PAG_1, MSP.MSPL_PAG_1))) AS ADLS,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_2 IS NOT NULL, MSPMF.MSPM_PAG_2, IIF(MSPM1.MSPM_PAG_2 IS NOT NULL, MSPM1.MSPM_PAG_2, MSP.MSPL_PAG_2))) AS CHDS,\n" +
                "    SUM(IIF(MSPMF.MSPM_PAG_4 IS NOT NULL, MSPMF.MSPM_PAG_4, IIF(MSPM1.MSPM_PAG_4 IS NOT NULL, MSPM1.MSPM_PAG_4, MSP.MSPL_PAG_4))) AS INFS\n" +
                "FROM TBAS_MASTER_PLAN_CITIES MSPC \n" +
                "LEFT JOIN TBAS_MASTER_PLAN_ENROLLMENT MSP ON MSP.MSP_UID = MSPC.MSP_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_MANIFEST_FINAL MSPMF ON MSPMF.MSP_UID = MSP.MSP_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_CITIES MSPC1 ON MSPC1.MSP_UID = MSP.MSP_UID AND MSPC1.MSPH_ORDER = 1\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_MANIFEST MSPM1 ON MSPM1.MSPH_UID = MSPC1.MSPH_UID\n" +
                "LEFT JOIN TBAS_MASTER_PLAN_HOTELS MSPH ON MSPH.MSPH_UID = MSPC.MSPH_UID\n" +
                "LEFT JOIN TBAS_HOTELS TH ON TH.HOT_UID = MSPH.HOT_UID\n" +
                "WHERE MSPC.MSPH_ENTER >= '" + date10 + "' AND MSPC.MSPH_ENTER <= '" + date11 + "' AND MSPH.HOT_UID = '" + hot + "' AND MSPC.MSPH_NIGHTS > 1 AND MSP.MSPL_BAJ IS NOT NULL AND MSP.MSPL_MANIFEST IS NOT NULL\n" +
                "GROUP BY MSPH.HOT_UID, MSPC.MSPH_NIGHTS";
            //console.log(sql1);

            db.query(sql1, function (err, result) {

                for (var i = 0; i < result.length; i++) {
                    if (result[i].HOT_UID) result[i].HOT_UID = JSON.stringify(result[i].HOT_UID.toString());
                    if (result[i].HOT_NAME) result[i].HOT_NAME = iconv.decode(result[i].HOT_NAME, 'WINDOWS-1256');
                }
                res.json(result);
                db.detach();
            });

        });

    }
});
module.exports = router;
