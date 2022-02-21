"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlLogger = exports.uploadProfile = exports.uploadMovie = exports.timeLogger = exports.securityLogger = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = exports.convertFiles = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteTitle = "Nomad Movies";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

exports.localsMiddleware = localsMiddleware;

var urlLogger = function urlLogger(req, res, next) {
  console.log("Path : ".concat(req.url));
  next();
};

exports.urlLogger = urlLogger;

var timeLogger = function timeLogger(req, res, next) {
  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var todayDate = today.getDate();
  console.log("Time : ".concat(todayYear, ".").concat(todayMonth + 1, ".").concat(todayDate, " "));
  next();
};

exports.timeLogger = timeLogger;

var securityLogger = function securityLogger(req, res, next) {
  var inSecure = req.protocol === "http" ? "✅ Secure" : "❌ Insecure";
  console.log("Insecure ", inSecure);
  next();
};

exports.securityLogger = securityLogger;

var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next(); //로그인 되어 있으면 통과
  } else {
    req.flash("error", "Not authorized. Log in first");
    return res.redirect("/user/login");
  }
};

exports.protectorMiddleware = protectorMiddleware;

var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    return next(); //로그인 되어 있지 않으면 통과
  } else {
    req.flash("error", "Not authorized. Log out first.");
    return res.redirect("/");
  }
};

exports.publicOnlyMiddleware = publicOnlyMiddleware;
var uploadProfile = (0, _multer["default"])({
  dest: "assets/"
});
exports.uploadProfile = uploadProfile;
var uploadMovie = (0, _multer["default"])({
  dest: "movies/"
});
exports.uploadMovie = uploadMovie;

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'texts/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var convertFiles = (0, _multer["default"])({
  storage: storage
});
exports.convertFiles = convertFiles;