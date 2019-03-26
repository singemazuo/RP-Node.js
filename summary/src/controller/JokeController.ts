import express from "express";
import Joke from "../models/Joke";
import BaseController from "./BaseController";
import IController from "./icontroller";

// The controller for joke
class JokeController extends BaseController implements IController {

    /**
     * the implementation for router
     * @param app the context object for express
     */
    public setupRouter(app: express.Application) {
        // req : request & res: response
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
