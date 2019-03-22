import express from "express";
import Joke from "../models/Joke";
import BaseController from "./BaseController";
import IController from "./icontroller";

class JokeController extends BaseController implements IController {

    public setupRouter(app: express.Application) {
        app.get("/", (req, res) => {
            res.redirect("/jokes");
        });

        app.get("/jokes", (req, res) => {
            Joke.findAll((err: any, jokes: any) => {
                res.render( "pages/jokes" );
            });
        });
    }

}

export default JokeController;
