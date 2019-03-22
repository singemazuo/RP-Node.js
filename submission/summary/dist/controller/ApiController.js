"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
const Joke_1 = __importDefault(require("../models/Joke"));
const User_1 = __importDefault(require("../models/User"));
const BaseController_1 = __importDefault(require("./BaseController"));
class ApiController extends BaseController_1.default {
    setupRouter(app) {
        /////////////////// Joke API ///////////////////
        app.get("/api/jokes", (req, res) => {
            Joke_1.default.findAll((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/jokes/new", (req, res) => {
            const joke = new Joke_1.default({
                title: req.body.title,
                teaser: req.body.teaser,
                text: req.body.text,
                user: req.body.user,
                category: req.body.category
            });
            joke.save((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/jokes/update", (req, res) => {
            const joke = new Joke_1.default({
                title: req.body.title,
                teaser: req.body.teaser,
                text: req.body.text,
                user: req.body.user,
                category: req.body.category
            });
            joke.save((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/jokes/delete", (req, res) => {
            Joke_1.default.deleteJoke(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err) => {
                res.jsonp(this.response(err, null));
            });
        });
        /////////////////// User API ///////////////////
        app.get("/api/users", (req, res) => {
            User_1.default.findAll((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/users/new", (req, res) => {
            const user = new User_1.default({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            });
            user.save((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/users/update", (req, res) => {
            const user = new User_1.default({
                firstName: req.body.fname,
                lastName: req.body.lname,
                username: req.body.uname,
                password: req.body.pwd,
                email: req.body.email,
                avatar: req.body.avatar
            });
            user.save((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/users/delete", (req, res) => {
            User_1.default.deleteUser(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err) => {
                res.jsonp(this.response(err, null));
            });
        });
        /////////////////// Category API ///////////////////
        app.get("/api/categories", (req, res) => {
            Category_1.default.findAll((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/categories/new", (req, res) => {
            const cate = new Category_1.default({
                category: req.body.category
            });
            cate.save((err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/categories/update", (req, res) => {
            Category_1.default.update(req.body.id, req.body.category, (err, data) => {
                res.jsonp(this.response(err, data));
            });
        });
        app.post("/api/categories/delete", (req, res) => {
            Category_1.default.deleteCategory(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err) => {
                res.jsonp(this.response(err, null));
            });
        });
    }
    response(err, data) {
        if (!err) {
            return { err: "", content: data };
        }
        else {
            return { err: err.message, content: null };
        }
    }
}
exports.default = ApiController;
//# sourceMappingURL=ApiController.js.map