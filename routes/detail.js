const express = require('express');
const {Menu, User, UserMenu, Comment} = require('../models/index');
const router = express.Router();

router.get('/:id', function (req, res) {

    let showMenu = function () {
        // let comments = [{user: {id: 'xx', avatar: 'xx', username: 'xxa'}, content: 'fawefawefawefawefawe', createdAt: '2108'},
        //     {user: {id: 'xx', avatar: 'xx', username: 'xxa'}, content: 'awefawefawefciojnl.ajkn拉开的味道垃圾费', createdAt: '2108'}];
        let comments = [];
        Menu.findOne(id)
            .then(rsp => {
                let menu = rsp.data
                if (!menu) {
                    req.flash('error', '菜谱不存在');
                    res.redirect('/');
                } else {
                    req.session.menuHistory = req.session.menuHistory ? req.session.menuHistory : [];
                    req.session.menuHistory.push({
                        id: menu.id,
                        title: menu.title,
                        tags: menu.tags,
                        albums: menu.albums
                    });
                    Comment.findCommentsByMenuId(id).then(rsp => {
                        rsp.data.forEach(v => {
                            comments.push({user: { username: v.account}, content: v.comment, createdAt: v.updateTime})
                        })
                        res.render('detail', {result: menu, comments: comments});
                    })
                }
            });
    };

    const {id} = req.params;
    res.locals.collectDisabled = false;
    if (req.session.user) {
        let param = {account: req.session.user.account, menuId: id}
        UserMenu.findRelation(param)
            .then(rsp => {
                let userMenu = rsp.data
                if (!userMenu) {
                    res.locals.collectDisabled = false;
                } else {
                    res.locals.collectDisabled = true;
                }
                showMenu();
            })
    } else {
        showMenu();
    }
});

router.get('/add-user-menu/:id', function (req, res) {
    const {id} = req.params;
    let param = {account: req.session.user.account, menuId: id};
    UserMenu.createRelation(param)
        .then(rsp => {
            // res.render('detail', {result: menu});
            res.redirect("/detail/" + id);
        });
});

router.post('/add-comment', function (req, res) {
    // const {account, menuId, comment} = ;
    console.log(req.body)
    Comment.createComment(req.body).then(() => {
        res.redirect("/detail/" + req.body.menuId);
    }).catch(e=>{
        console.log(e)
    })
});

module.exports = router;