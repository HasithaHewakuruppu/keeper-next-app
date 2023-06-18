import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
//import { itemSchema } from "./Item";
import { listSchema } from "./List";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
 // list: [itemSchema],
  days:[listSchema]
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
});

const User = mongoose.models.User || mongoose.model("User", userSchema); // Use mongoose.model instead of checking mongoose.models

export default User;

