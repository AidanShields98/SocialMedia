const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const userSchema = new Schema({
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true, unique: true },
  expoPushToken: { type: String, required: true },
  profilePicture: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "userId",
});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
