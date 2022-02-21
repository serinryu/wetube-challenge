"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 0,
    max: new Date().getFullYear()
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  genre: [{
    type: String
  }],
  fileUrl: {
    type: String,
    required: true
  },
  thumbUrl: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
movieSchema["static"]("formatGenres", function (genre) {
  return genre.split(",").map(function (word) {
    return word.trim();
  });
});

var Movie = _mongoose["default"].model('Movie', movieSchema);

var _default = Movie;
exports["default"] = _default;