"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joke_1 = __importDefault(require("../models/Joke"));
const BaseController_1 = __importDefault(require("./BaseController"));
class JokeController extends BaseController_1.default {
    setupRouter(app) {
        app.get("/", (req, res) => {
            res.redirect("/jokes");
        });
        app.get("/jokes", (req, res) => {
            Joke_1.default.findAll((err, jokes) => {
                res.render("pages/jokes");
            });
        });
    }
}
exports.default = JokeController;
//# sourceMappingURL=JokeController.js.map