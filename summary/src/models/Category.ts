import * as mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: String,
    createdAt: {type: Date, default: Date.now}
});

categorySchema.statics.findAll = async function(callback: any) {
  this.find({}, callback);
};

categorySchema.statics.deleteCategory = async function(ids: [any], callback: any, handleError: any) {
  this.remove({ _id: { $in: ids}}, (err: Error) => {
    if (err) { return handleError(err); }

    callback();
  });
};

categorySchema.statics.update = async function(id: string, category: string, callback: any, handleError: any) {
  this.findById(id, (err: Error, doc: any) => {
    if (err) {
      handleError(err);
    } else {
        doc.category = category; // 修改了内存中的数据age
        // 用save来将数据保存到数据库中
        doc.save((err1: Error, doc1: any) => {
          if (err1) { return handleError(err1); }

          callback(null, doc1);
        });
    }
  });
};

const Category = mongoose.model("Category", categorySchema);

export default Category;
