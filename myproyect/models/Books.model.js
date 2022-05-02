const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");
// const { schema } = require("./User.model");

const bookSchema = new Schema(
    {
    title: String,
    author: String,
    cover: String,
    }
)

const Book = model("Book", bookSchema);
module.exports = Book;
