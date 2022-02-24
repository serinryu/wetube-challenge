import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
    title : { type: String, required: true },
    description: { type: String, required: true  },
    summary : { type: String, required: true  },
    //year : { type: Number, required: true, min: 0, max: new Date().getFullYear() },
    createdYear: { type: Number, required: true },
    createdMonth: { type: Number, required: true },
    createdDate: { type: Number, required: true },
    //rating : { type: Number, required: true, min: 0, max: 10  },
    genre : [{ type: String }],
    fileUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    meta : { 
        views : { type: Number, default:0, required:true },
    },
    comments : [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
})

movieSchema.static("formatGenres", function(genre){
    return genre
        .split(",")
        .map((word) => word.trim())
});

const Movie = mongoose.model('Movie', movieSchema)
export default Movie;