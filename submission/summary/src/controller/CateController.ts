import express from "express";
import Category from "../models/Category";
import BaseController from "./BaseController";
import IController from "./icontroller";

class JokeController extends BaseController implements IController {

    public setupRouter(app: express.Application) {
        app.get("/categories", (req, res) => {
            res.render( "pages/categories" );
        });
    }

}

export default JokeController;
