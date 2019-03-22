import express from "express";
import User from "../models/User";
import BaseController from "./BaseController";
import IController from "./icontroller";

class UserController extends BaseController implements IController {

    public setupRouter(app: express.Application) {
        app.get("/users", (req, res) => {
            User.findAll((err: any, jokes: any) => {
                res.render( "pages/users" );
            });
        });
    }

}

export default UserController;
