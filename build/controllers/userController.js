"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.postLogin = exports.postJoin = exports.postEditprofile = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEditprofile = exports.getChangePassword = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("user/join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, email, username, password, password2, pageTitle, userExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, password2 = _req$body.password2;
            pageTitle = "Join";

            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).render("user/join", {
              pageTitle: pageTitle,
              errorMessage: "wrong password confirmation."
            }));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 7:
            userExists = _context.sent;

            if (!userExists) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).render("user/join", {
              pageTitle: pageTitle,
              errorMessage: "username or email was already taken."
            }));

          case 10:
            _context.next = 12;
            return _User["default"].create({
              name: name,
              email: email,
              username: username,
              password: password
            });

          case 12:
            return _context.abrupt("return", res.status(200).render("user/login", {
              pageTitle: "Login",
              errorMessage: "회원가입 성공. 로그인 해주세요!"
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            console.error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 15]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render("user/login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, passwordMatch;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pageTitle = "Login";
            _context2.prev = 2;
            _context2.next = 5;
            return _User["default"].findOne({
              username: username
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("user/login", {
              pageTitle: pageTitle,
              errorMessage: "Did you join? Please join first!"
            }));

          case 8:
            _context2.next = 10;
            return _bcrypt["default"].compare(password, user.password);

          case 10:
            passwordMatch = _context2.sent;

            if (passwordMatch) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("user/login", {
              pageTitle: pageTitle,
              errorMessage: "Wrong password"
            }));

          case 13:
            //LOGIN
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.status(200).redirect('/'));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](2);
            console.error(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 18]]);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/");
};

exports.logout = logout;

var profile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            username = req.params.username;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).render("partials/404", {
              pageTitle: "User is not found"
            }));

          case 7:
            return _context3.abrupt("return", res.render("user/profile", _defineProperty({
              pageTitle: "".concat(user.username, "'s profile"),
              user: user
            }, "user", user)));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function profile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.profile = profile;

var getEditprofile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _id, username, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.session.user._id, username = req.params.username;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            user = _context4.sent;

            if (user) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).render("partials/404", {
              pageTitle: "User is not found"
            }));

          case 7:
            if (!(String(_id) !== String(user._id))) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(403).redirect("/user/profile/".concat(username)));

          case 9:
            return _context4.abrupt("return", res.render("user/editprofile", {
              pageTitle: "Edit  ".concat(user.username, "'s profile"),
              user: user
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function getEditprofile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEditprofile = getEditprofile;

var postEditprofile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$session$user, avatarUrl, _id, username, _req$body3, name, email, file, existsUser, updatedUser;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$session$user = req.session.user, avatarUrl = _req$session$user.avatarUrl, _id = _req$session$user._id, username = req.params.username, _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, file = req.file;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            existsUser = _context5.sent;

            if (existsUser) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).render("partials/404", {
              pageTitle: "User is not found"
            }));

          case 7:
            if (!(String(_id) !== String(existsUser._id))) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(403).redirect("/user/profile/".concat(username)));

          case 9:
            _context5.next = 11;
            return _User["default"].findOneAndUpdate({
              username: username
            }, {
              avatarUrl: file ? file.path : avatarUrl,
              name: name,
              email: email
            }, {
              "new": true
            });

          case 11:
            updatedUser = _context5.sent;
            req.session.user = updatedUser;
            console.log(req.session.user);
            return _context5.abrupt("return", res.redirect("/user/profile/".concat(username)));

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 17]]);
  }));

  return function postEditprofile(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditprofile = postEditprofile;

var getChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", res.render("user/changepassword", {
              pageTitle: "Change password"
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPasswordConfirmation, user, passwordCompare;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirmation = _req$body4.newPasswordConfirmation;
            _context7.next = 3;
            return _User["default"].findById(_id);

          case 3:
            user = _context7.sent;
            _context7.next = 6;
            return _bcrypt["default"].compare(oldPassword, user.password);

          case 6:
            passwordCompare = _context7.sent;

            if (!(newPassword !== newPasswordConfirmation)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("user/changepassword", {
              pageTitle: "Change Password",
              errorMessage: "The password does not match the confirmation"
            }));

          case 9:
            if (passwordCompare) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("user/changepassword", {
              pageTitle: "Change Password",
              errorMessage: "The current password is incorrect"
            }));

          case 11:
            //세션 업데이트
            user.password = newPassword; //DB 업데이트

            _context7.next = 14;
            return user.save();

          case 14:
            return _context7.abrupt("return", res.redirect("/user/logout"));

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function postChangePassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;