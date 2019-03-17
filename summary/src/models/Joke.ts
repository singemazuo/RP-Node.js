import * as mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
    title: String,
    teaser: String,
    text: String,
    visible: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories"
    }
});

jokeSchema.statics.findAll = async function(callback: any) {
  this.find({}).exec((err: Error, doc: any) => {
    if (err) { return callback(err, null); }

    callback(null, doc);
  });
};

jokeSchema.statics.deleteJoke = async function(ids: [any], callback: any, handleError: any) {
  this.remove({ _id: { $in: ids}}, (err: Error) => {
    if (err) { return handleError(err); }

    callback();
  });
};

const Joke = mongoose.model("Joke", jokeSchema);

export default Joke;
