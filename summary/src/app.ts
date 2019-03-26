/**
 * @author Yinbin Zuo & Adam Crooks
 * @date March 19th, 2019
 */

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

// this constant is for saving objects of all controllers
const controllers = new Array<IController>();

/**
 * basic configuration including setting up view engine, database initialization, controllers, middleware
 */
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

    // push in the instances of the controller which has inherited from BaseController class and IController interface
    controllers.push(new JokeController());
    controllers.push(new UserController());
    controllers.push(new CateController());
    controllers.push(new ApiController());
  }

  /**
   * make connection to the database
   */
  private initializeDatabase() {
    
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch((err: any) => {
        // console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });
  }

  /**
   * register any middleware such as static folder
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(express.static("src/public"));
    // this.app.use(express.static(path.join(process.cwd(), 'public')));
  }

  /**
   * register view engine, basic is html that don't need to register
   */
  private initializeViewEngine() {
    this.app.set( "views", path.join( __dirname, "views" ) );
    this.app.set( "view engine", "ejs" );
  }

  /**
   * For each base controller and Interface in our array it runs the setup of the router through its interface.
   */
  private initializeControllers() {
    controllers.forEach((controller: BaseController & IController) => {
      controller.setupRouter(this.app);
    });
  }
}

export default App;
