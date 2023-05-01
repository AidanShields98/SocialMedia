const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }],
  expoPushToken: { type: String, required: true },
  profilePicture: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
