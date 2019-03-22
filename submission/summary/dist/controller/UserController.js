"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const BaseController_1 = __importDefault(require("./BaseController"));
class UserController extends BaseController_1.default {
    setupRouter(app) {
        app.get("/users", (req, res) => {
            User_1.default.findAll((err, jokes) => {
                res.render("pages/users");
            });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map