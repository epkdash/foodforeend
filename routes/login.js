const express = require('express');
const svgCaptcha = require('svg-captcha');
const {User, Article, Menu, ArticleComment, Comment} = require('../models/index');
const router = express.Router();

router.get('/', function (req, res) {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.locals.account = req.session.account;
    delete req.session.account;
    res.locals.captcha = captcha;
    // res.app.locals.Referer = req.get('Referer');
    res.render('login');
});

router.post('/', function (req, res) {
    const {account, password, captcha} = req.body;
    if (captcha.toUpperCase() !== req.session.captcha.toUpperCase()) {
        req.flash('error', '验证码错误！');
        res.redirect('back');
    } else {
        User.findOne(account).then(rsp => {
            let user = rsp.data
            if (!user) {
                req.flash('error', '用户不存在!');
                res.redirect('back');
            } else {
                if (password !== user.password) {
                    req.flash('error', '密码错误！');
                    req.session.account = account;
                    res.redirect('back');
                } else {
                    req.session.user = user;
                    res.redirect("/");

                    // req.session.user.following = [];
                    // req.session.user.followers = [];
                    // req.session.user.collections = user.dataValues.menus;
                    // req.session.user.collectedArticles = user.dataValues.articles;
                    // req.session.user.articles = [];
                    // req.session.user.articleComments = user.dataValues.articleComments;
                    // req.session.user.comments = user.dataValues.comments;

                    // user.getFollowing().then(followings => {
                    //     followings.map(value => {
                    //         req.session.user.following.push(value.dataValues);
                    //     });
                    //     user.getFollowers().then(followers => {
                    //         followers.map(value => {
                    //             req.session.user.followers.push(value.dataValues);
                    //         });
                    //         Article.findAll({
                    //             where: {userId: req.session.user.id}
                    //         }).then(articles => {
                    //             articles.map(value => {
                    //                 req.session.user.articles.push(value.dataValues);
                    //             });
                    //             res.redirect(res.app.locals.Referer);  // res.app.locals.Referer 为在 GET /user 时存储的 `req.get('Referer')`
                    //         });
                    //     });
                    // });
                }
            }
        }).catch(e => {
            console.log(e)
        });

    }
});

module.exports = router;