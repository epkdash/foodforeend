const express = require('express');
const sgMail = require('@sendgrid/mail');
const svgCaptcha = require('svg-captcha');
const {User, Captcha} = require('../models/index');
const {AVATAR_BOY, AVATAR_GIRL, PORT, CLOUD_HOSTNAME} = require('../utilities/const');
const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function (req, res) {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.render('register', {captcha});
});

router.post('/', function (req, res) {
    const {email, account, password, passwordConfirm, gender, captcha} = req.body;
    if (captcha.toUpperCase() !== req.session.captcha.toUpperCase()) {
        req.flash('error', '验证码错误！');
        res.redirect('/register');
    } else if (password !== passwordConfirm) {
        req.flash('error', '两次密码不一致');
        res.redirect('/register');
    } else if (gender !== 'Male' && gender !== 'Female') {
        req.flash('error', '性别有误！');
        res.redirect('/register');
    } else if (!(/^[a-zA-Z0-9]{5,16}$/.test(account))) {
        req.flash('error', '账号只能是英文字母或数字！');
        res.redirect('/register');
    } else {
        const CAPTCHA = Math.floor(100000 + Math.random() * 899999);

        User.findOne(account)
            .then(rsp => {
                let user = rsp.data
                if (user) {
                    req.flash('error', '用户已存在');
                    res.redirect('/register');
                } else {
                    // const avatar = gender === '男' ? AVATAR_BOY : AVATAR_GIRL;
                    const strGender = gender === 'Male' ? 'M' : 'F';

                    User.create({
                        email,
                        account,
                        username: account,
                        password: password,
                        avatar: '',
                        gender: strGender,
                        intro: ''
                    }).then(rsp => {
                        let user = rsp.data;

                        // const msg = {
                        //     to: email,
                        //     from: '"小当家" <venus@venusworld.cn>',
                        //     subject: '小当家注册验证',
                        //     html: `<p>${user.dataValues.username}：</p><p>&nbsp;&nbsp;请点击以下链接完成邮箱验证：</p><p><a href="${CLOUD_HOSTNAME}:${PORT}/confirmEmail?captcha=${CAPTCHA}&email=${email}&account=${account}">${CLOUD_HOSTNAME}:${PORT}/confirmEmail?captcha=${CAPTCHA}&email=${email}&account=${account}</a></p><p>如果以上链接无法点击，请将上面的地址复制到你的浏览器地址栏。</p>`
                        // };

                        // const timestamp = new Date().getTime();
                        // Captcha.create({
                        //     timestamp,
                        //     used: false,
                        //     value: CAPTCHA,
                        //     userId: user.dataValues.id
                        // }).then(() => {
                        //     sgMail.send(msg).then(() => {
                                req.session.account = user.account;
                                req.flash('info', '注册成功，请登录。');
                                res.redirect('/login');
                        //     }).catch(error => {
                        //         console.log(error);
                        //         req.flash('error', '注册出错！');
                        //         res.redirect('/');
                        //     });
                        // });


                    });
                }
            });
    }
});

module.exports = router;