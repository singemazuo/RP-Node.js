import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    avatar: String,
    userType: {type: String, enum: ["Admin", "User"], default: "User"}
});

userSchema.statics.findAll = async function(callback: any) {
  this.find({}, callback);
};

userSchema.statics.deleteUser = async function(ids: [any], callback: any, handleError: any) {
  this.remove({ _id: { $in: ids}}, (err: Error) => {
    if (err) { return handleError(err); }

    callback();
  });
};

userSchema.statics.update = async function(user: any, callback: any, handleError: any) {
  this.findById(user._id, (err: Error, doc: any) => {
    if (err) {
      handleError(err);
    } else {
        doc.firstName = user.firstName;
        doc.lastName = user.lastName;
        doc.username = user.username;
        doc.password = user.password;
        doc.email = user.email;
        doc.avatar = user.avatar;
        doc.userType = user.userType;

        doc.save((err1: Error, doc1: any) => {
          if (err1) { return handleError(err1); }

          callback(null, doc1);
        });
    }
  });
};

const User = mongoose.model("User", userSchema);

export default User;
