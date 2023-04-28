const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
    validate: {
      validator: function (v) {
        return Number.isInteger(v);
      },
      message: (props) => `${props.value} is not a valid user id!`,
    },
  },
  image: { type: String, required: true },
  caption: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});



const Post = mongoose.model("Post", postSchema);

module.exports = { Post, postSchema };
