"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerView = exports.postUpload = exports.postEdit = exports.movieDetail = exports.home = exports.getUpload = exports.getEdit = exports.filterMovie = exports.deleteMovie = exports.deleteComment = exports.createComment = void 0;

var _Movie = _interopRequireDefault(require("../models/Movie.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Comment = _interopRequireDefault(require("../models/Comment.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var movies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Movie["default"].find({}).populate("owner");

          case 3:
            movies = _context.sent;
            return _context.abrupt("return", res.render("movies/home", {
              pageTitle: "Home",
              movies: movies
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var movieDetail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, movie;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Movie["default"].findById(id).populate("owner").populate("comments");

          case 4:
            movie = _context2.sent;

            if (movie) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.render("partials/404", {
              pageTitle: "Movie is not found"
            }));

          case 7:
            return _context2.abrupt("return", res.render("movies/detail", {
              pageTitle: movie.title,
              movie: movie
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 10]]);
  }));

  return function movieDetail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.movieDetail = movieDetail;

var filterMovie = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$query, title, year, rating, gettitleMovies, getyearMovies, getratingMovies, movies, both, pageTitle_two, pageTitle;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.query);
            _req$query = req.query, title = _req$query.title, year = _req$query.year, rating = _req$query.rating;
            _context3.prev = 2;
            _context3.next = 5;
            return _Movie["default"].find({
              title: {
                $regex: new RegExp("".concat(title), "i")
              }
            });

          case 5:
            gettitleMovies = _context3.sent;
            _context3.next = 8;
            return _Movie["default"].find({
              year: {
                $gte: year
              }
            });

          case 8:
            getyearMovies = _context3.sent;
            _context3.next = 11;
            return _Movie["default"].find({
              rating: {
                $gte: rating
              }
            });

          case 11:
            getratingMovies = _context3.sent;
            //console.log([...getratingMovies, ...getyearMovies])
            movies = title !== "" ? _toConsumableArray(gettitleMovies) : [].concat(_toConsumableArray(getratingMovies), _toConsumableArray(getyearMovies));
            movies = _lodash["default"].uniqBy(movies, "id");
            console.log(movies); //제목 설정

            both = year !== "" && rating !== "" ? "||" : "";

            if (title !== "") {
              pageTitle_two = "title";
            } else {
              pageTitle_two = "\n            ".concat(year === "" ? "" : "year: ".concat(year), " \n            ").concat(both, " \n            ").concat(rating === "" ? "" : "rating: ".concat(rating), "\n            ");
            }

            pageTitle = "Searching by ".concat(pageTitle_two);
            return _context3.abrupt("return", res.render("movies/home", {
              pageTitle: pageTitle,
              movies: movies
            }));

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](2);
            console.error(_context3.t0);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 21]]);
  }));

  return function filterMovie(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.filterMovie = filterMovie;

var getUpload = function getUpload(req, res) {
  return res.render("movies/upload", {
    pageTitle: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _id, _req$body, title, id, description, summary, year, rating, genre, _req$files, video, thumb;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.session.user._id;
            _req$body = req.body, title = _req$body.title, id = _req$body.id, description = _req$body.description, summary = _req$body.summary, year = _req$body.year, rating = _req$body.rating, genre = _req$body.genre;
            _req$files = req.files, video = _req$files.video, thumb = _req$files.thumb;

            if (!(year < 0 || year > new Date().getFullYear())) {
              _context4.next = 6;
              break;
            }

            req.flash("error", "Check year");
            return _context4.abrupt("return", res.status(400).redirect("/movies/upload"));

          case 6:
            if (!(rating < 0 || rating > 10)) {
              _context4.next = 9;
              break;
            }

            req.flash("error", "Rate range : 0~10");
            return _context4.abrupt("return", res.status(400).redirect("/movies/upload"));

          case 9:
            _context4.prev = 9;
            _context4.next = 12;
            return _Movie["default"].create({
              title: title,
              description: description,
              summary: summary,
              year: year,
              rating: rating,
              genre: _Movie["default"].formatGenres(genre),
              //쉼표 포함된 문자열로 받는데 이것을 Movie.js에서 선언한 static 함수 사용하여 배열로 만듦
              owner: _id,
              fileUrl: video[0].path,
              thumbUrl: thumb[0].path
            });

          case 12:
            return _context4.abrupt("return", res.redirect("/"));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](9);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(400).render("movies/upload", {
              pageTitle: "Upload Movie",
              errorMessage: _context4.t0._message
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[9, 15]]);
  }));

  return function postUpload(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var getEdit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, movie;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Movie["default"].findById(id);

          case 4:
            movie = _context5.sent;

            if (movie) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).render("404", {
              pageTitle: "Movie no found."
            }));

          case 7:
            return _context5.abrupt("return", res.render("movies/edit", {
              pageTitle: "Edit Movie : ".concat(movie.title),
              movie: movie
            }));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));

  return function getEdit(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description, summary, year, rating, genre, _req$files2, video, thumb, movie;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, summary = _req$body2.summary, year = _req$body2.year, rating = _req$body2.rating, genre = _req$body2.genre;
            _req$files2 = req.files, video = _req$files2.video, thumb = _req$files2.thumb;
            /*
            const { id } = req.params
            const { title, description, summary, year, rating, genre } = req.body;
            */

            _context6.prev = 2;
            _context6.next = 5;
            return _Movie["default"].exists({
              _id: id
            });

          case 5:
            movie = _context6.sent;

            if (movie) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(404).render("partials/404", {
              pageTitle: "Movie no found."
            }));

          case 8:
            console.log(movie);
            _context6.next = 11;
            return _Movie["default"].findByIdAndUpdate(id, {
              title: title,
              description: description,
              summary: summary,
              year: year,
              rating: rating,
              genre: _Movie["default"].formatGenres(genre),
              fileUrl: video[0].path,
              thumbUrl: thumb[0].path
            });

          case 11:
            return _context6.abrupt("return", res.redirect("/movies/".concat(id)));

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](2);
            console.error(_context6.t0);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 14]]);
  }));

  return function postEdit(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var deleteMovie = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, movie;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _Movie["default"].findById(id);

          case 3:
            movie = _context7.sent;

            if (movie) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(404).render("404", {
              pageTitle: "Movie no found."
            }));

          case 6:
            _context7.next = 8;
            return _Movie["default"].findByIdAndDelete(id);

          case 8:
            return _context7.abrupt("return", res.redirect("/"));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteMovie(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteMovie = deleteMovie;

var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, movie;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.next = 3;
            return _Movie["default"].findById(id);

          case 3:
            movie = _context8.sent;

            if (movie) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.sendStatus(404));

          case 6:
            //console.log(movie);
            movie.meta.views = movie.meta.views + 1;
            _context8.next = 9;
            return movie.save();

          case 9:
            return _context8.abrupt("return", res.sendStatus(200));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.registerView = registerView;

var createComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var user, text, id, comment, movie;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            /* 댓글이 두 번 작성되는 에러 발생 (post 가 두 번 되고 있다.)*/
            user = req.session.user, text = req.body.text, id = req.params.id;
            console.log(id);
            console.log("twice..");
            _context9.next = 5;
            return _Comment["default"].create({
              text: text,
              owner: user._id,
              movie: id
            });

          case 5:
            comment = _context9.sent;
            console.log(text);
            _context9.next = 9;
            return _Movie["default"].findById(id);

          case 9:
            movie = _context9.sent;

            if (movie) {
              _context9.next = 12;
              break;
            }

            return _context9.abrupt("return", res.sendStatus(404));

          case 12:
            _context9.next = 14;
            return movie.comments.push(comment._id);

          case 14:
            _context9.next = 16;
            return movie.save();

          case 16:
            return _context9.abrupt("return", res.sendStatus(201));

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function createComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, user, comment;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, user = req.session.user;
            _context10.next = 3;
            return _Comment["default"].findById(id).populate("video").populate("owner");

          case 3:
            comment = _context10.sent;

            if (comment) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", res.sendStatus(404));

          case 6:
            if (!(String(user._id) !== String(comment.owner._id))) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.Status(403).redirect("/"));

          case 8:
            _context10.next = 10;
            return _Comment["default"].findByIdAndDelete(id);

          case 10:
            return _context10.abrupt("return", res.sendStatus(201));

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;