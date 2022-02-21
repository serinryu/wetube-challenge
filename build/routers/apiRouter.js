"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _movieController = require("../controllers/movieController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/movies/:id/view", _movieController.registerView);
apiRouter.post("/movies/:id/comment", _movieController.createComment);
apiRouter["delete"]("/movies/:id/comment/delete", _movieController.deleteComment);
var _default = apiRouter;
exports["default"] = _default;