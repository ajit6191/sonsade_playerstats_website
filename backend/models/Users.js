import { model, Schema } from "mongoose";

const userSchema = Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const User = model("User", userSchema);

export default User;
