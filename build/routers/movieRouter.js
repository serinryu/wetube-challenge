"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _movieController = require("../controllers/movieController.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var movieRouter = _express["default"].Router();

movieRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_movieController.getUpload).post(_middlewares.uploadMovie.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _movieController.postUpload);
movieRouter.get("/:id", _movieController.movieDetail);
movieRouter.route("/:id/edit").all(_middlewares.protectorMiddleware).get(_movieController.getEdit).post(_middlewares.uploadMovie.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _movieController.postEdit);
movieRouter.all(_middlewares.protectorMiddleware).get("/:id/delete", _movieController.deleteMovie);
var _default = movieRouter;
exports["default"] = _default;