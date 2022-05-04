const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");
// const { schema } = require("./User.model");

const bookSchema = new Schema(
    {
    title: String,
    author: String,
    cover: {
        type: String,
        default: 'https://picsum.photos/200/300'
    }
  
    })


const Book = model("Book", bookSchema);
module.exports = Book;
