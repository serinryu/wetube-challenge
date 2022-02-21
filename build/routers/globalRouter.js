"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _movieController = require("../controllers/movieController.js");

var _convertController = require("../controllers/convertController.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get("/", _movieController.home);
globalRouter.get("/search", _movieController.filterMovie);
globalRouter.route("/convert").get(_convertController.getConvert).post(_middlewares.convertFiles.single("textfile"), _convertController.postConvert);
globalRouter.get("/convert/:id", _convertController.converDetail);
var _default = globalRouter;
exports["default"] = _default;