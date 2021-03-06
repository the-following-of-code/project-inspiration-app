const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");
// const { schema } = require("./Movie.model");

const movieSchema = new Schema(
    {
    title: String,
    imdbID: String,
    cover: { 
       type: String,
       default: 'https://picsum.photos/200/300'
    },
    year: String,
    type: String
    } 
    )


const Movie = model("Movie", movieSchema);
module.exports = Movie;
