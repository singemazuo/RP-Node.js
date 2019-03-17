"use strict";
// import bodyParser from "body-parser";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const app_1 = __importDefault(require("./app"));
// import mongoose from "mongoose";
// import path from "path";
// import * as sessionAuth from "./middleware/sessionAuth";
// import * as routes from "./routes";
// initialize configuration
// dotenv.config();
// const app = express();
// const port = process.env.SERVER_PORT;
// mongoose.connect("mongodb://dev:dev1234@ds153657.mlab.com:53657/joker", { useNewUrlParser: true }).then(
//     () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
//   ).catch((err: any) => {
//     // console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//     // process.exit();
// });
// app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("src/public"));
// // Configure Express to use EJS
// app.set( "views", path.join( __dirname, "views" ) );
// app.set( "view engine", "ejs" );
// // Configure session auth
// sessionAuth.register( app );
// // Configure routes
// routes.register( app );
// // define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.render("index");
// } );
// // start the Express server
// app.listen( port, () => {
//     // tslint:disable-next-line:no-console
//     console.log( `server started at http://localhost:${ port }` );
// });
const app = new app_1.default();
app.listen();
//# sourceMappingURL=server.js.map