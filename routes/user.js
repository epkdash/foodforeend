const express = require('express');
// const multer  = require('multer');
// const qiniu = require('qiniu');
const path = require('path');
var fs = require("fs");
var formidable = require('formidable');

const router = express.Router();
const { User, Menu, UserMenu, Comment } = require('../models/index');
const { PLEASE_LOGIN, GENDER_ERROR, UPDATE_SUCCESS, QINIU_DOMAIN } = require('../utilities/const');
// const upload = multer({
// 	dest: 'uploads/',
// 	limits: {
// 		fileSize: 1024 * 1024
// 	}
// });

router.get('/', function(req, res) {
	res.locals.users = [];
	User.findAll().then(users => {
		if (users.length === 0) {
			res.render('chart');
		} else {
			users.map((value, index) => {
				res.locals.users.push(users[index].dataValues);
				users[index].getFollowers().then((followers) => {
					res.locals.users[index].followers = followers.length;
					users[index].getFollowing().then((following => {
						res.locals.users[index].following = following.length;
						if (index === users.length - 1) {
							res.render('chart');
						}
					}));
				});
			});
		}
	});
});

router.get('/setting', function(req, res) {
	if (!req.session.user) {
		req.flash('error', PLEASE_LOGIN);
		res.redirect('/');
	} else {
		User.findById(parseInt(req.session.user.id)).then(user => {
			if (!user) {
				req.flash('error', PLEASE_LOGIN);
				res.redirect('/');
			} else {
				res.render('setting');
			}
		});
	}
});

// router.post('/setting', upload.single('avatar'), function(req, res) {
// 	const { username, gender, intro} = req.body;
//
// 	if (!req.session.user) {
// 		req.flash('error', PLEASE_LOGIN);
// 		res.redirect('/login');
// 	} else if (gender !== '男' && gender !== '女') {
// 		req.flash('error', GENDER_ERROR);
// 		res.redirect('/user/setting');
// 	} else if (typeof req.file === 'undefined') {
// 		const intGender = gender === '男' ? 1 : 0;
// 		User.update({
// 			username,
// 			gender: intGender,
// 			intro
// 		}, {
// 			where: { id: parseInt(req.session.user.id) }
// 		}).then(() => {
// 			User.findById(req.session.user.id).then(user => {
// 				req.session.user.username = user.dataValues.username;
// 				req.session.user.gender = user.dataValues.gender;
// 				req.session.user.intro = user.dataValues.intro;
//
// 				req.flash('info', UPDATE_SUCCESS);
// 				res.redirect('/user/0');
// 			});
// 		});
// 	} else {
// 		const intGender = gender === '男' ? 1 : 0;
// 		const mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESS_KEY, process.env.QINIU_SECRET_KEY);
//
// 		let config = new qiniu.conf.Config();
// 		config.zone = qiniu.zone.Zone_z2;
//
// 		const localFile = path.join(__dirname, '..', req.file.path);
//
// 		const formUploader = new qiniu.form_up.FormUploader(config);
// 		const putExtra = new qiniu.form_up.PutExtra();
//
// 		const keyToOverwrite = `avatar/${req.file.filename}.jpg`;
// 		const options = {
// 			scope: `${process.env.QINIU_BUCKET}:${keyToOverwrite}`
// 		};
// 		const putPolicy = new qiniu.rs.PutPolicy(options);
// 		const uploadToken = putPolicy.uploadToken(mac);
//
// 		formUploader.putFile(uploadToken, keyToOverwrite, localFile, putExtra, (respErr, respBody, respInfo) => {
// 			if (respErr) {
// 				throw respErr;
// 			}
// 			if (respInfo.statusCode == 200) {
// 				User.update({
// 					username,
// 					gender: intGender,
// 					avatar: QINIU_DOMAIN + keyToOverwrite,
// 					intro
// 				}, {
// 					where: { id: parseInt(req.session.user.id) }
// 				}).then(() => {
// 					User.findById(req.session.user.id).then(user => {
// 						req.session.user.username = user.dataValues.username;
// 						req.session.user.gender = user.dataValues.gender;
// 						req.session.user.intro = user.dataValues.intro;
// 						req.session.user.avatar = user.dataValues.avatar;
//
// 						req.flash('info', UPDATE_SUCCESS);
// 						res.redirect('/user/0');
// 					});
// 				});
// 			} else {
// 				req.flash('info', UPDATE_SUCCESS);
// 				res.redirect('back');
// 			}
// 		});
// 	}
// });

router.get('/0', function(req, res) {
    let menus = [];
	if (req.session.user) {
        UserMenu.findRelations(req.session.user.account).then(
        	rsp => {
        		let userMenus = rsp.data;
                let promises = []
                userMenus.forEach((v) => {
                    promises.push(Menu.findOne(v.menuId))
                })
                Promise.all(promises).then(
                    (data) => {
                        data.forEach((rsp)=>{
                            let menu = rsp.data;
                            menus.push(menu)
                        });

                        Comment.findCommentsByAccount(req.session.user.account).then(rsp => {
                            let comments = rsp.data;
                            res.render('user', {menus: menus, comments: comments});
						});

                    }
                ).catch(e =>{console.log(e)})
            }
		)
	} else {
		req.flash('error', '请先登录！');
		res.redirect('/login');
	}
});

router.post('/add-menu', function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname, '../public');
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        var filename = files.pic.name
		console.log(filename)
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.pic.path, newPath);  //重命名
        // res.send({data:"/upload/"+avatarName})
        fields.albums = "/" + avatarName;
        Menu.create(fields).then((rsp) => {
            let menuId = rsp.data;
            res.redirect("/detail/" + menuId);
        }).catch(e => {
            console.log(e)
        })
    })
});


module.exports = router;