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
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    avatar: String,
    userType: { type: String, enum: ["Admin", "User"], default: "User" }
});
userSchema.statics.findAll = function (callback) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({}, callback);
    });
};
userSchema.statics.deleteUser = function (ids, callback, handleError) {
    return __awaiter(this, void 0, void 0, function* () {
        this.remove({ _id: { $in: ids } }, (err) => {
            if (err) {
                return handleError(err);
            }
            callback();
        });
    });
};
userSchema.statics.update = function (user, callback, handleError) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findById(user._id, (err, doc) => {
            if (err) {
                handleError(err);
            }
            else {
                doc.firstName = user.firstName;
                doc.lastName = user.lastName;
                doc.username = user.username;
                doc.password = user.password;
                doc.email = user.email;
                doc.avatar = user.avatar;
                doc.userType = user.userType;
                doc.save((err1, doc1) => {
                    if (err1) {
                        return handleError(err1);
                    }
                    callback(null, doc1);
                });
            }
        });
    });
};
const User = mongoose.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map