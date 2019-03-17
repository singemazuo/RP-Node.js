"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const ApiController_1 = __importDefault(require("./controller/ApiController"));
const CateController_1 = __importDefault(require("./controller/CateController"));
const JokeController_1 = __importDefault(require("./controller/JokeController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const controllers = new Array();
class App {
    constructor() {
        this.app = express_1.default();
        this.initlization();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeViewEngine();
        this.initializeControllers();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server started at http://localhost:${this.port}`);
        });
    }
    initlization() {
        dotenv_1.default.config();
        this.port = process.env.SERVER_PORT;
        controllers.push(new JokeController_1.default());
        controllers.push(new UserController_1.default());
        controllers.push(new CateController_1.default());
        controllers.push(new ApiController_1.default());
    }
    initializeDatabase() {
        mongoose_1.default.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => { }).catch((err) => {
            // console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("src/public"));
        // this.app.use(express.static(path.join(process.cwd(), 'public')));
    }
    initializeViewEngine() {
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
    }
    initializeControllers() {
        controllers.forEach((controller) => {
            controller.setupRouter(this.app);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map