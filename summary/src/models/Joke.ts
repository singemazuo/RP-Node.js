import * as mongoose from "mongoose";

/**
 * The joke schema definition including field and type definition
 */
const jokeSchema = new mongoose.Schema({
    title: String,
    teaser: String,
    text: String,
    visible: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    user: {// foreign key for category
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    category: {// foreign key for category
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories"
    }
});

// static method findAll method
jokeSchema.statics.findAll = async function(callback: any) {
  this.find({}).exec((err: Error, doc: any) => {
    if (err) { return callback(err, null); }

    callback(null, doc);
  });
};

// static method deleteJoke method
jokeSchema.statics.deleteJoke = async function(ids: [any], callback: any, handleError: any) {
  this.remove({ _id: { $in: ids}}, (err: Error) => {
    if (err) { return handleError(err); }

    callback();
  });
};

const Joke = mongoose.model("Joke", jokeSchema);

export default Joke;
