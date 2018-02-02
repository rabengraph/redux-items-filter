'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultsState = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxAct = require('redux-act');

var _index = require('../actions/index');

var _syncActions = require('../actions/syncActions');

var _utils = require('../utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultsState = exports.defaultsState = {
    filterInitialized: false,
    itemsView: 'list',
    collection: [],
    filteredItems: [],
    filteredItemsPaged: [],
    visibleItems: [],
    visibleItemsPaged: [],
    foundItemsCount: 0,
    currentPage: 1,
    pagesLeft: 0,
    currentQuery: {},
    initialQuery: {},
    focusedItem: {
        item: null
    },
    filterControllerVisible: true
};

exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, _index.initialize, function (state /* , payload */) {
    return _extends({}, state, {
        filterInitialized: true,
        currentQuery: _extends({}, state.initialQuery) // keep  a reference to the initial query, to be able to restore the initial state on reset
    });
}), _defineProperty(_createReducer, _index.resetQuery, function (state) {
    return _extends({}, state, {
        currentQuery: _extends({}, state.initialQuery)
    });
}), _defineProperty(_createReducer, _index.setQuery, function (state, params) {
    var query = params.query;

    return _extends({}, state, {
        currentQuery: query
    });
}), _defineProperty(_createReducer, _index.changeItemsView, function (state, _ref) {
    var itemsView = _ref.itemsView;

    return _extends({}, state, {
        itemsView: itemsView
    });
}), _defineProperty(_createReducer, _index.toggleFilterController, function (state) {
    return _extends({}, state, {
        filterControllerVisible: !state.filterControllerVisible
    });
}), _defineProperty(_createReducer, _syncActions.getItems, function (state, _ref2) {
    var pageLimit = _ref2.pageLimit,
        filterCollectionReducer = _ref2.filterCollectionReducer;

    var filteredItems = filterCollectionReducer(state.collection, state.currentQuery);
    var _currentPage = 0;
    var filteredItemsPaged = filteredItems.reduce(function (accumulator, curr, i) {
        if (i % pageLimit === 0) {
            _currentPage++;
            return [].concat(_toConsumableArray(accumulator), [{ page: _currentPage, items: [curr] }]); // start a new page
        }
        return accumulator.map(function (innerCurr) {
            return innerCurr.page === _currentPage ? _extends({}, innerCurr, { items: [].concat(_toConsumableArray(innerCurr.items), [curr]) }) : innerCurr;
        }); // add the item to the currrent page
    }, []);
    var currentPage = 1;
    var foundItemsCount = filteredItems.length;
    return _extends({}, state, {
        filteredItems: filteredItems,
        filteredItemsPaged: filteredItemsPaged,
        visibleItemsPaged: [{
            page: 1,
            items: filteredItemsPaged[0] ? [].concat(_toConsumableArray(filteredItemsPaged[0].items)) : []
        }],
        visibleItems: filteredItemsPaged[0] ? [].concat(_toConsumableArray(filteredItemsPaged[0].items)) : [],
        currentPage: currentPage,
        foundItemsCount: foundItemsCount,
        pagesLeft: (0, _utils.calculatePagesLeft)(foundItemsCount, currentPage, pageLimit)
    });
}), _defineProperty(_createReducer, _syncActions.getItemsNextPage, function (state, _ref3) {
    var pageLimit = _ref3.pageLimit;

    var currentPage = parseInt(state.currentPage + 1, 10);
    var nextItems = state.filteredItemsPaged.find(function (curr) {
        return curr.page === currentPage;
    });
    if (!nextItems) {
        return state;
    }
    return _extends({}, state, {
        loading: false,
        visibleItemsPaged: [[].concat(_toConsumableArray(state.visibleItemsPaged), [nextItems])],
        visibleItems: [].concat(_toConsumableArray(state.visibleItems), _toConsumableArray(nextItems.items)),
        currentPage: currentPage,
        pagesLeft: (0, _utils.calculatePagesLeft)(state.foundItemsCount, currentPage, pageLimit)
    });
}), _createReducer), defaultsState);