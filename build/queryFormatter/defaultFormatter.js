'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ = require('.');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (query, action) {
    switch (action.type) {
        case _.FORMAT_TO_QUERYSTRING:
        case _.FORMAT_TO_REST_QUERYSTRING:
            return typeof query !== 'string' ? _queryString2.default.stringify(query) : query;
        case _.FORMAT_TO_REDUX_FORM:
        default:
            return query;
    }
};