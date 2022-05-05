const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
<<<<<<< HEAD
    // username: {
    //   type: String,
    //   // unique: true -> Ideally, should be unique, but its up to you
    // },
=======
    username: {
      type: String,
      unique: true
    },
>>>>>>> 37f41110388ebe0fd35168755a7902c3c0b7d0a4
    email: String,
    password: String,
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }],
    movies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }],
    booksWatchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }],
    moviesWatchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
      }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
