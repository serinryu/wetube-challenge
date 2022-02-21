"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db.js");

require("./models/Movie.js");

require("./models/User.js");

require("./models/Comment");

var _server = _interopRequireDefault(require("./server.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//.env 사용해주기 위함
var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT, " \uD83E\uDD21 "));
};

_server["default"].listen(PORT, handleListening);