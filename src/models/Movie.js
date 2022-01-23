import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    id: Number, 
    description: String,
    year: Number,
    rating: Number,
    genre: [{type:String}],
})

const Movie = mongoose.model('Movie', movieSchema)
export default Movie;