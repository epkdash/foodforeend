// const Sequelize = require('sequelize');
//
// const DATABASE_NAME = 'smallmenu';
// const DATABASE_USERNAME = 'root';
// const DATABASE_PASSWORD = '';
// // const HOSTNAME = 'mysql';    // docker 部署 时使用
// const HOSTNAME = 'localhost';   // 本地部署     时使用
//
// let sequelize = new Sequelize(
// 	DATABASE_NAME,
// 	DATABASE_USERNAME,
// 	DATABASE_PASSWORD,
// 	{
// 		host: HOSTNAME,
// 		dialect: 'mysql',
// 		port: 3306,
// 		operatorsAliases: false,
// 		logging: false
// 	});
//
// const Menu = sequelize.import('./Menu');
// const User = sequelize.import('./User');
// const Captcha = sequelize.import('./Captcha');
// const Comment = sequelize.import('./Comment');
// const Article = sequelize.import('./Article');
// const ArticleComment = sequelize.import('./ArticleComment');
// const UserMenu = sequelize.import('./UserMenu');
// const UserArticle = sequelize.import('./UserArticle');
// const UserFollowers = sequelize.import('./UserFollowers');
// const UserFollowing = sequelize.import('./UserFollowing');
//
// User.belongsToMany(User, { as: 'Following', through: UserFollowing});
// User.belongsToMany(User, { as: 'Followers', through: UserFollowers});
//
// Captcha.belongsTo(User);
//
// User.belongsToMany(Menu, { through: UserMenu});
// Menu.belongsToMany(User, { through: UserMenu});
//
// User.hasMany(Comment);
// Menu.hasMany(Comment);
//
// Article.belongsTo(User);						// 文章作者
// Article.hasMany(ArticleComment);		// 文章评论
// User.hasMany(ArticleComment);				// 文章评论
// Article.belongsToMany(User, { through: UserArticle });		// 文章收藏者
// User.belongsToMany(Article, { through: UserArticle });		// 文章收藏者
//
// sequelize.sync();
//
// module.exports = {
// 	User,
// 	Captcha,
// 	Menu,
// 	Comment,
// 	Article,
// 	ArticleComment,
// 	UserMenu,
// 	UserFollowing,
// 	UserFollowers,
// 	UserArticle
// };
//

const axios = require('axios');
// const menuData = require('../testdata/menudata');
const {BASE_URL} = require('../utilities/const');


const Menu = {
    findAll: function (params) {
        // return menuData.getMenus();
        return axios({
            method: 'get',
            url: BASE_URL + '/menus',
            headers: {'Accept': 'application/json'}
        })
    },
    findRandom: function ({limit}) {
        // return menuData.getRandomMenus();
        return axios({
            method: 'get',
            url: BASE_URL + '/menus/random/limit/' + limit.toString(),
            headers: {'Accept': 'application/json'}
        })
    },
    findOne: function (mId) {
        // return menuData.getOneMenu(mId);
        return axios({
            method: 'get',
            url: BASE_URL + '/menu/' + mId.toString(),
            headers: {'Accept': 'application/json'}
        })
    },
    findMenuByType: function ({type}) {
        return axios({
            method: 'get',
            url: BASE_URL + '/menus/type/' + type,
            headers: {'Accept': 'application/json'}
        })
    },
    create: function (data) {
        return axios({
            method: 'post',
            data: data,
            url: BASE_URL + '/menu',
            headers: {'Accept': 'application/json'}
        })
    }
};
const User = {
    findOne: function (account) {
        // return menuData.getOneMenu(mId);
        return axios({
            method: 'get',
            url: BASE_URL + '/user/' + account,
            headers: {'Accept': 'application/json'}
        })
    },
    create: function (data) {
        // return menuData.getOneMenu(mId);
        return axios({
            method: 'post',
            data: data,
            url: BASE_URL + '/user',
            headers: {'Accept': 'application/json'}
        })
    },
};
// const Captcha = {};
const UserMenu = {
    findRelations: function (account) {
        return axios({
            method: 'get',
            url: BASE_URL + '/relation/' + account,
            headers: {'Accept': 'application/json'}
        })
    },
    findRelation: function ({account, menuId}) {
        return axios({
            method: 'get',
            url: BASE_URL + '/relation/' + account + '/' + menuId,
            headers: {'Accept': 'application/json'}
        })
    },
    createRelation: function ({account, menuId}) {
        return axios({
            method: 'post',
            url: BASE_URL + '/relation/' + account + '/' + menuId,
            headers: {'Accept': 'application/json'}
        })
    },
};
const Comment = {
    findCommentsByMenuId: function (menuId) {
        return axios({
            method: 'get',
            url: BASE_URL + '/comment/menuId/' + menuId,
            headers: {'Accept': 'application/json'}
        })
    },
    findCommentsByAccount: function (account) {
        return axios({
            method: 'get',
            url: BASE_URL + '/comment/account/' + account,
            headers: {'Accept': 'application/json'}
        })
    },
    createComment: function ({account, menuId, comment}) {
        return axios({
            method: 'post',
            url: BASE_URL + '/comment/' + account + '/' + menuId,
            data: comment,
            headers: {'Accept': 'application/json'}
        })
    },
};
// const Article = {};
// const ArticleComment = {};
// const UserMenu = {};
// const UserArticle = {};
// const UserFollowers = {};
// const UserFollowing = {};

module.exports = {
    User,
    Menu,
    UserMenu,
    Comment,
    // Captcha,
    // Article,
    // ArticleComment,
    // UserMenu,
    // UserFollowing,
    // UserFollowers,
    // UserArticle
};