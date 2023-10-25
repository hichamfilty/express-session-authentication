const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema  = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
})
UserSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (!user.isModified("password")) next();

    let hash = await bcrypt.hash(user.password, 13);
    user.password = hash;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    let compare = await bcrypt.compare(password, this.password);

    return compare;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = mongoose.model('User', UserSchema)