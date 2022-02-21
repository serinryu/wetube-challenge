"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postConvert = exports.getConvert = exports.converDetail = void 0;

var _fs = require("fs");

var getConvert = function getConvert(req, res) {
  (0, _fs.readdir)('texts', function (err, files) {
    try {
      console.log(files);
      return res.render("convert/convert.pug", {
        pageTitle: "추가 서비스: TXT to HTML",
        files: files
      });
    } catch (err) {
      return res.render("convert/convert.pug", {
        pageTitle: "추가 서비스: TXT to HTML"
      }, {
        errorMessage: "Error"
      });
    }
  });
};

exports.getConvert = getConvert;

var postConvert = function postConvert(req, res) {
  var file = req.file;
  (0, _fs.readFile)("texts/".concat(file.filename), 'utf8', function (err, data) {
    try {
      (0, _fs.readdir)('texts', function (err, files) {
        return res.render("convert/convert.pug", {
          pageTitle: "추가 서비스: TXT to HTML",
          data: data,
          files: files
        });
      });
    } catch (err) {
      return res.render("convert/convert.pug", {
        pageTitle: "추가 서비스: TXT to HTML"
      }, {
        errorMessage: "Error"
      });
    }
  });
};

exports.postConvert = postConvert;

var converDetail = function converDetail(req, res) {
  var id = req.params.id;
  console.log(id);
  (0, _fs.readFile)("texts/".concat(id), 'utf8', function (err, data) {
    try {
      console.log(data);
      return res.render("convert/detail.pug", {
        pageTitle: "".concat(id),
        data: data
      });
    } catch (err) {
      return res.render("convert/detail.pug", {
        pageTitle: "".concat(id),
        errorMessage: "Error"
      });
    }
  });
};

exports.converDetail = converDetail;