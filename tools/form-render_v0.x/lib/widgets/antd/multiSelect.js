"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _multiSelectHoc = _interopRequireDefault(require("../../components/multiSelectHoc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _multiSelectHoc.default)(_select.default);

exports.default = _default;