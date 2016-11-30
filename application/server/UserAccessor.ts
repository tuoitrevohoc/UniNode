import {User} from "../common/model/User";
import * as mongoose from "mongoose";
import {createAccessor} from "./Accessor";

/**
 * The interface
 */
interface UserModel extends User, mongoose.Document {
}

/**
 * the schema for user class
 */
export const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String
});

/**
 * the user accessor
 */
export const userAccessor = createAccessor<UserModel>("User", userSchema);