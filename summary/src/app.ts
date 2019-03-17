import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import ApiController from "./controller/ApiController";
import BaseController from "./controller/BaseController";
import CateController from "./controller/CateController";
import IController from "./controller/IController";
import JokeController from "./controller/JokeController";
import UserController from "./controller/UserController";

const controllers = new Array<IController>();

class App {
  public app: express.Application;
  public port: any;

  constructor() {
    this.app = express();

    this.initlization();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeViewEngine();
    this.initializeControllers();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log( `server started at http://localhost:${ this.port }` );
    });
  }

  private initlization() {
    dotenv.config();

    this.port = process.env.SERVER_PORT;

    controllers.push(new JokeController());
    controllers.push(new UserController());
    controllers.push(new CateController());
    controllers.push(new ApiController());
  }

  private initializeDatabase() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch((err: any) => {
        // console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(express.static("src/public"));
    // this.app.use(express.static(path.join(process.cwd(), 'public')));
  }

  private initializeViewEngine() {
    this.app.set( "views", path.join( __dirname, "views" ) );
    this.app.set( "view engine", "ejs" );
  }

  private initializeControllers() {
    controllers.forEach((controller: BaseController & IController) => {
      controller.setupRouter(this.app);
    });
  }
}

export default App;
