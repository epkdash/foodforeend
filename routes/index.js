const express = require('express');
const {User, Captcha, Menu} = require('../models/index');
const {PLEASE_LOGIN} = require('../utilities/const');
const router = express.Router();

router.get('/', function (req, res) {
    if (req.session.user) {
        res.locals.currentUser = req.session.user;
    }
    res.locals.menus = [];
    Menu.findRandom({limit: 7}).then(rsp => {
        let menus = rsp.data
        if (menus.length === 0) {
            req.flash('error', '暂时没有菜谱');
        } else {
            res.locals.showOne = menus[0]
            menus = menus.splice(1, menus.length)
            menus.forEach((value, index) => {
                res.locals.menus.push(menus[index]);
            });
            res.render('index');
        }
    });
});


router.get('/confirmEmail', function (req, res) {
    const {captcha, email, account} = req.query;
    User.findOne({where: {email, account, confirmed: false}})
        .then(user => {
            if (!user) {
                req.flash('error', '用户不存在');
                res.redirect('/');
            } else {
                Captcha.findOne({
                    where: {
                        userId: user.dataValues.id,
                        used: false,
                        value: captcha
                    }
                }).then(captcha => {
                    if (!captcha) {
                        req.flash('error', '邮件验证码不存在！');
                        res.redirect('/');
                    } else {
                        Captcha.update({
                            used: true
                        }, {
                            where: {
                                id: captcha.id
                            }
                        }).then(() => {
                            User.update({
                                confirmed: true
                            }, {
                                where: {
                                    email,
                                    account
                                }
                            }).then(() => {
                                // req.session.user = user.dataValues;
                                req.flash('info', '邮箱验证成功');
                                res.redirect('/');
                            });
                        });
                    }
                });
            }
        });
});


module.exports = router;