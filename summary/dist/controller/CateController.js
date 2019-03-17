"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
class JokeController extends BaseController_1.default {
    setupRouter(app) {
        app.get("/categories", (req, res) => {
            res.render("pages/categories");
        });
    }
}
exports.default = JokeController;
//# sourceMappingURL=CateController.js.map