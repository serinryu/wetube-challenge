"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.route("/join").all(_middlewares.publicOnlyMiddleware).get(_userController.getJoin).post(_userController.postJoin);
userRouter.route("/login").all(_middlewares.publicOnlyMiddleware).get(_userController.getLogin).post(_userController.postLogin);
userRouter.all(_middlewares.protectorMiddleware).get("/logout", _userController.logout);
userRouter.get("/profile/:username", _userController.profile); //공개프로필

userRouter.route("/profile/:username/edit").all(_middlewares.protectorMiddleware) //로그인한사람만 입장
.get(_userController.getEditprofile).post(_middlewares.uploadProfile.single("avatar"), _userController.postEditprofile);
userRouter.route("/changepassword").all(_middlewares.protectorMiddleware).get(_userController.getChangePassword).post(_userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;