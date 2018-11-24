const express = require('express');
const {Menu} = require('../models/index');
const router = express.Router();

router.get('/:offset', function (req, res) {
    const {offset} = req.params;
    res.locals.menus = [];
    Menu.findAll({
        offset: parseInt(offset),
        limit: 100
    }).then(rsp => {
        let menus = rsp.data
        if (menus.length === 0) {
            res.render('menu', {offset: 0});
        } else {
            menus.forEach((value, index) => {
                res.locals.menus.push(menus[index]);
                // if (index === menus.length - 1) {
                // 	Menu.findAll().then(menus => {
                // 		res.render('menu', { offset: parseInt(offset), totalNumPage: Math.ceil(menus.length/100), totalMenusNum: menus.length });
                // 	});
                // }
            });
            res.render('menu');
        }
    });
});


router.get('/random/:limit', function (req, res) {
    const {limit} = req.params;
    console.log('limit', limit)

    if (req.session.user) {
        res.locals.currentUser = req.session.user;
    }
    res.locals.menus = [];
    Menu.findRandom({limit: limit}).then(rsp => {
        let menus = rsp.data
        if (menus.length === 0) {
            req.flash('error', '暂时没有菜谱');
        } else {
            menus.forEach((value, index) => {
                res.locals.menus.push(menus[index]);
            });
            res.render('menu');
        }
    });
});

router.get('/:type/:offset', function (req, res) {
    const {type, offset} = req.params;
    console.log('type', type)

    res.locals.menus = [];
    Menu.findMenuByType({
        type: type,
        offset: parseInt(offset),
        limit: 100
    }).then(rsp => {
        let menus = rsp.data
        if (menus.length === 0) {
            res.render('menu', {offset: 0});
        } else {
            menus.forEach((value, index) => {
                res.locals.menus.push(menus[index]);
                // if (index === menus.length - 1) {
                //     Menu.findMenuByType({
                //         type: type,
                //         offset: parseInt(offset),
                //         limit: 100
                //     }).then(menus => {
                //         res.render('menu', { offset: parseInt(offset), totalNumPage: Math.ceil(menus.length/100), totalMenusNum: menus.length });
                //     });
                //
                // }
            });
            res.render('menu');
        }
    });
});


module.exports = router;