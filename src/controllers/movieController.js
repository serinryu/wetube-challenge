import Movie from "../models/Movie.js";

export const home = async(req, res) => {
    const movies = await Movie.find({});
    return res.render("movies/home", { pageTitle: "Home", movies })
};
    

export const movieDetail = async(req, res) => {
    const { id } = req.params;
    const moviearray = await Movie.find({id:id});
    const movie = moviearray[0]
    if ( movie === null ) {
        return res.render("movies/404.pug", { pageTitle: "Movie is not found"})
    }
    console.log(movie);
    return res.render("movies/detail.pug", {pageTitle: movie.title, movie })
};

export const filterMovie = async(req, res) => {
    console.log(req.query);
    const {
        query: { year, rating }
    } = req;
    const getyearMovies = await Movie.find({ year: { $gte: year } });
    const getratingMovies = await Movie.find({ rating: {$gte: rating } });
    const movies = [...getratingMovies, ...getyearMovies];
    const both = year !== "" && rating !== "" ? "||" : "";
    const pageTitle = `Searching by ${
      year === "" ? "" : `year: ${year}`
    } ${both} ${rating === "" ? "" : `rating: ${rating}`}`;
    console.log(getyearMovies)
    return res.render("movies/home", { pageTitle, movies });
};