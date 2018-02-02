"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isQueryEqual = isQueryEqual;
var calculateQueryOffset = exports.calculateQueryOffset = function calculateQueryOffset(pageNum, limitPerPage) {
    return parseInt(limitPerPage * (pageNum - 1), 10);
};
var calculatePagesLeft = exports.calculatePagesLeft = function calculatePagesLeft(total, currentPageNum, limitPerPage) {
    var queryOffset = calculateQueryOffset(currentPageNum, limitPerPage);
    var itemsLeft = total - queryOffset;
    return Math.floor(itemsLeft / limitPerPage);
};

var sortObjectProperties = function sortObjectProperties(object) {
    var keys = Object.keys(object);
    var length = keys.length;
    // const i = 0;
    keys.sort();
    var ret = {};
    for (var i = 0; i < length; i++) {
        var k = keys[i];
        ret[k] = object[k];
    }
    return ret;
};

function isQueryEqual(query1, query2) {
    return JSON.stringify(sortObjectProperties(query1)) === JSON.stringify(sortObjectProperties(query2));
}