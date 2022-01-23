import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube2", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Eroor", error);

db.on("error", handleError);
db.once("open", handleOpen);




/* 


// This gives you an array of all the movies
export const getMovies = () => movies;

// This gives you one movie, don't forget to pass the ID
export const getMovieById = (id) => {
  if (!id) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE ID TO THE FUNCTION  ❌ ");
  }
  return movies.find((m) => m.id === parseInt(id, 10));
};

// This gives you an array of movies with a release date of minimum X
export const getMovieByMinimumYear = (year) => {
  if (!year) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE YEAR TO THE FUNCTION  ❌");
  }
  return movies.filter((m) => m.year >= year);
};

// This gives you an array of movies with a rating of minimum X
export const getMovieByMinimumRating = (rating) => {
  if (!rating) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE RATING TO THE FUNCTION  ❌");
  }
  return movies.filter((m) => m.rating >= rating);
};

*/