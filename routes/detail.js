const express = require('express');
const {Menu, User} = require('../models/index');
const router = express.Router();

router.get('/:id', function (req, res) {
    const {id} = req.params;
    res.locals.collectDisabled = false;

    if (req.session.user) {
        for (let i = 0; i < req.session.user.collections.length; i++) {
            if (req.session.user.collections[i].id === parseInt(id)) {
                res.locals.collectDisabled = true;
            }
        }
    }

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
                res.render('detail', {result: menu});
            }
        });
});

module.exports = router;