"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _middlewares = require("./middlewares.js");

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter.js"));

var _movieRouter = _interopRequireDefault(require("./routers/movieRouter.js"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); //middleware   

app.use(_express["default"].json());
app.use((0, _expressFlash["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
})); // 로그인 상태 유지 (세션)

app.use(_middlewares.localsMiddleware);
app.use(_middlewares.urlLogger);
app.use(_middlewares.timeLogger);
app.use(_middlewares.securityLogger);
/* 세션DB 에 저장된 정보 확인
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions)=>{
        console.log(sessions);
        next();
    })
})
*/

app.use("/assets", _express["default"]["static"]("assets"));
app.use("/movies", _express["default"]["static"]("movies"));
app.use("/texts", _express["default"]["static"]("texts"));
app.use("/output", _express["default"]["static"]("output"));
app.use("/convert", _express["default"]["static"]("node_modules/@ffmpeg/core/dist")); //@ffmpeg/core를 못찾아서 404에러 났는데 core 있는곳 폴더 express static으로 지정해버리고, createFFmpeg() 함수에서 corePath 수동지정

app.use(function (req, res, next) {
  //@ffmpeg 시 에러 해결(보안문제)
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/", _globalRouter["default"]);
app.use("/movies", _movieRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;