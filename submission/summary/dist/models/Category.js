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
const categorySchema = new mongoose.Schema({
    category: String,
    createdAt: { type: Date, default: Date.now }
});
categorySchema.statics.findAll = function (callback) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({}, callback);
    });
};
categorySchema.statics.deleteCategory = function (ids, callback, handleError) {
    return __awaiter(this, void 0, void 0, function* () {
        this.remove({ _id: { $in: ids } }, (err) => {
            if (err) {
                return handleError(err);
            }
            callback();
        });
    });
};
categorySchema.statics.update = function (id, category, callback, handleError) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findById(id, (err, doc) => {
            if (err) {
                handleError(err);
            }
            else {
                doc.category = category; // 修改了内存中的数据age
                // 用save来将数据保存到数据库中
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
const Category = mongoose.model("Category", categorySchema);
exports.default = Category;
//# sourceMappingURL=Category.js.map