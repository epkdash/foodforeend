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


const Menu = {
	findAll: function () {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve(
					[
						{
							id: 1000,
							title: 'xxx',
							tags: 'x',
							imtro: '食谱简介asdfas',
							ingredients: '原料xxasfasfd',
							burden: '食谱佐料asfdasdfas',
							albums: '食谱封面图像fasdfas',
							steps: '食谱步骤fawefawef'
						},
						{
							id: 1001,
							title: 'yyy',
							tags: 'y',
							imtro: '食谱简介afafsdfas',
							ingredients: '原料xxasfeeewaasfd',
							burden: '食谱佐料asfdasfawdfas',
							albums: '食谱封面图像fasdcawwefas',
							steps: '食谱步骤fawefawefawawef'
						}]
				);
			}, 1000);
		});
	}
};
const User = {};
const Captcha = {};
const Comment = {};
const Article = {};
const ArticleComment = {};
const UserMenu = {};
const UserArticle = {};
const UserFollowers = {};
const UserFollowing = {};

module.exports = {
	User,
	Captcha,
	Menu,
	Comment,
	Article,
	ArticleComment,
	UserMenu,
	UserFollowing,
	UserFollowers,
	UserArticle
};