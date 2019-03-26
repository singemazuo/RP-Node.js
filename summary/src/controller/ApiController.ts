import express = require("express");
import Category from "../models/Category";
import Joke from "../models/Joke";
import User from "../models/User";
import BaseController from "./BaseController";
import IController from "./icontroller";

class ApiController extends BaseController implements IController {

    public setupRouter(app: express.Application) {
        /////////////////// Joke API ///////////////////
        app.get("/api/jokes", (req, res) => {
            Joke.findAll((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/jokes/new", (req, res) => {
            // instantiate Joke model
            const joke = new Joke({
                title: req.body.title,
                teaser: req.body.teaser,
                text: req.body.text,
                user: req.body.user,
                category: req.body.category
            });
            joke.save((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/jokes/update", (req, res) => {
            const joke = new Joke({
                title: req.body.title,
                teaser: req.body.teaser,
                text: req.body.text,
                user: req.body.user,
                category: req.body.category
            });
            joke.save((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/jokes/delete", (req, res) => {
            Joke.deleteJoke(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err: Error) => {
                res.jsonp(this.response(err, null));
            });
        });

        /////////////////// User API ///////////////////

        app.get("/api/users", (req, res) => {
            User.findAll((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/users/new", (req, res) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar
            });
            user.save((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/users/update", (req, res) => {
            const user = new User({
                firstName: req.body.fname,
                lastName: req.body.lname,
                username: req.body.uname,
                password: req.body.pwd,
                email: req.body.email,
                avatar: req.body.avatar
            });
            user.save((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/users/delete", (req, res) => {
            User.deleteUser(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err: Error) => {
                res.jsonp(this.response(err, null));
            });
        });

        /////////////////// Category API ///////////////////

        app.get("/api/categories", (req, res) => {
            Category.findAll((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/categories/new", (req, res) => {
            const cate = new Category({
                category: req.body.category
            });
            cate.save((err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/categories/update", (req, res) => {
            Category.update(req.body.id, req.body.category, (err: Error, data: any) => {
                res.jsonp(this.response(err, data));
            });
        });

        app.post("/api/categories/delete", (req, res) => {
            Category.deleteCategory(req.body.ids, () => {
                res.jsonp(this.response(null, null));
            }, (err: Error) => {
                res.jsonp(this.response(err, null));
            });
        });
    }

    private response(err: Error, data: any): any {
        if (!err) {
            return {err: "", content: data};
        } else {
            return {err: err.message, content: null};
        }
    }

}

export default ApiController;
