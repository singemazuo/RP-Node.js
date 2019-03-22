"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const jokeSchema = new mongoose.Schema({
    title: String,
    teaser: String,
    text: String,
    visible: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }
});
jokeSchema.statics.findAll = function (callback) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({}).exec((err, doc) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, doc);
        });
    });
};
jokeSchema.statics.deleteJoke = function (ids, callback, handleError) {
    return __awaiter(this, void 0, void 0, function* () {
        this.remove({ _id: { $in: ids } }, (err) => {
            if (err) {
                return handleError(err);
            }
            callback();
        });
    });
};
const Joke = mongoose.model("Joke", jokeSchema);
exports.default = Joke;
//# sourceMappingURL=Joke.js.map