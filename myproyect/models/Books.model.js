const {Schmea, model} = require("mongoose");
const { schema } = require("./User.model");

const bookSchema = new schema(
    {
    title: String,
    author: String,
    cover: String,
    }
)

const Book = model("Book", bookSchema);
model.exports = Book;