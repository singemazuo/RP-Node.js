import express from "express";
//Here is the method being called from app.ts
interface IController {
    // declare the a method for setting up router
    setupRouter(app: express.Application): any;
}

export default IController;
