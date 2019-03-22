import express from "express";

interface IController {
    setupRouter(app: express.Application): any;
}

export default IController;
