import Movie from "../models/Movie.js";

export const home = async(req, res) => {
    try {
        const movies = await Movie.find({});
        return res.render("movies/home", { pageTitle: "Home", movies })
    } catch (err) {
        console.error(err);
    }
};
    
export const movieDetail = async(req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.render("partials/404", { pageTitle: "Movie is not found"})
        }
        return res.render("movies/detail", {pageTitle: movie.title, movie })
    } catch (err) {
        console.error(err);
    }
};

export const filterMovie = async(req, res) => {
    console.log(req.query);
    const {
        query: { title, year, rating }
    } = req;
    try {
        const gettitleMovies = await Movie.find({ 
            title : {$regex: new RegExp(`${title}`, "i")}
        });
        const getyearMovies = await Movie.find({ 
            year: { $gte: year } 
        });
        const getratingMovies = await Movie.find({ 
            rating: {$gte: rating } 
        });
        //console.log([...getratingMovies, ...getyearMovies])
        let movies = (title !== "") ? [...gettitleMovies] : [...getratingMovies, ...getyearMovies];
        movies = _.uniqBy(movies, "id");
        console.log(movies)
        //제목 설정
        const both = year !== "" && rating !== "" ? "||" : "";
        let pageTitle_two;
        if (title !== "") {
            pageTitle_two = `title`
        } else {
            pageTitle_two = `
            ${year === "" ? "" : `year: ${year}`} 
            ${both} 
            ${rating === "" ? "" : `rating: ${rating}`}
            `;
        }
        const pageTitle = `Searching by ${pageTitle_two}` 
        return res.render("movies/home", { pageTitle, movies });
    } catch (err) {
        console.error(err);
}
};

export const getUpload = (req, res) => {
    return res.render("movies/upload", { pageTitle : "Upload" })
};

export const postUpload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    const { title, id, description, summary, year, rating, genre } = req.body;
    const { path: fileUrl } = req.file;
    if (year < 0 || year > new Date().getFullYear()) {
        req.flash("error", "Check year");
        return res.status(400).redirect("/movies/upload");
    }
    if (rating < 0 || rating > 10) {
        req.flash("error", "Rate range : 0~10");
        return res.status(400).redirect("/movies/upload");
    }
    try {
        await Movie.create({
            title,
            description,
            summary,
            year,
            rating,
            genre : Movie.formatGenres(genre), //쉼표 포함된 문자열로 받는데 이것을 Movie.js에서 선언한 static 함수 사용하여 배열로 만듦
            fileUrl,
            owner: _id,
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("movies/upload", {
            pageTitle: "Upload Movie",
            errorMessage: error._message,
        })
    }
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).render("404", { pageTitle: "Movie no found." });
        }
        return res.render("movies/edit", { pageTitle : `Edit Movie : ${movie.title}`, movie })
    } catch (err) {
    console.error(err);
    }
};

export const postEdit = async (req, res) => {
    const {
        params: { id },
        body: { title, description, summary, year, rating, genre  }
    } = req;
    const { path: fileUrl } = req.file;
    /*
    const { id } = req.params
    const { title, description, summary, year, rating, genre } = req.body;
    */
   try {
        const movie = await Movie.exists({_id:id});
        if (!movie) {
            return res.status(404).render("partials/404", { pageTitle: "Movie no found." });
        }
        console.log(movie);
        await Movie.findByIdAndUpdate(id, {
            fileUrl,
            title, 
            description, 
            summary, 
            year, 
            rating, 
            genre : Movie.formatGenres(genre)
        });
        return res.redirect(`/movies/${id}`) 
    } catch (err) {
        console.error(err);
    } 
};

export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).render("404", { pageTitle: "Movie no found." });
    }
    await Movie.findByIdAndDelete(id);
    return res.redirect("/");
};

export const registerView = async (req, res) => {
    const { id } = req.params; 
    const movie = await Movie.findById(id);
    if (!movie){
        return res.sendStatus(404);
    }
    //console.log(movie);
    movie.meta.views = movie.meta.views + 1;
    await movie.save();
    return res.sendStatus(200);
}