'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ = require('.');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (queryData, action) {
    switch (action.type) {
        case _.PARSE_FROM_QUERYSTRING:
            return typeof queryData === 'string' ? _queryString2.default.parse(queryData) : queryData;
        case _.PARSE_FROM_REDUX_FORM:
        default:
            return queryData;
    }
};