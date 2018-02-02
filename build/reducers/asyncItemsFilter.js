'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultsState = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxAct = require('redux-act');

var _index = require('../actions/index');

var _asyncActions = require('../actions/asyncActions');

var _utils = require('../utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultsState = exports.defaultsState = {
    filterInitialized: false,
    itemsView: 'list',
    loading: false,
    visibleItems: [],
    visibleItemsPaged: [],
    foundItemsCount: 0,
    currentPage: 1,
    pagesLeft: 0,
    currentQuery: {},
    initialQuery: {},
    startTimeOfRequest: null,
    // currentResource: null,
    // currentResourceShort: null,
    error: null,
    locationItems: {
        startTimeOfRequest: null,
        loading: false,
        items: [],
        error: null
    },
    focusedItem: {
        loading: false,
        item: null,
        error: null
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
}), _defineProperty(_createReducer, _asyncActions.fetchItems.request, function (state, params) {
    var startTimeOfRequest = params.startTimeOfRequest;
    // replace with defaultsState if you want to rest the state everytime a new query starts

    return _extends({}, state, {
        startTimeOfRequest: startTimeOfRequest,
        loading: true,
        error: null
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItems.ok, function (state, payload) {
    var foundItemsCount = payload.response.data.total;
    var currentPage = 1;
    var startTimeOfRequest = payload.request[0].startTimeOfRequest;
    var pageLimit = payload.request[0].pageLimit;

    if (startTimeOfRequest !== state.startTimeOfRequest) {
        return state; // ignore requests that where overhauled by a later request
    }
    return _extends({}, state, {
        loading: false,
        visibleItemsPaged: [{
            page: 1,
            items: payload.response.data.data
        }],
        visibleItems: payload.response.data.data,
        foundItemsCount: foundItemsCount,
        currentPage: currentPage,
        pagesLeft: (0, _utils.calculatePagesLeft)(foundItemsCount, currentPage, pageLimit)
        // currentResource: payload.response.config.url,
        // currentResourceShort: payload.response.config.url.slice(payload.response.config.baseURL.length)
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItems.error, function (state, payload) {
    return _extends({}, state, {
        loading: false,
        error: payload.error
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItems.reset, function () {
    return defaultsState;
}), _defineProperty(_createReducer, _asyncActions.fetchItemsNextPage.request, function (state) {
    return _extends({}, state, {
        loading: true,
        error: null
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemsNextPage.ok, function (state, payload) {
    var currentPage = parseInt(state.currentPage + 1, 10);
    var pageLimit = payload.request[0].pageLimit;

    return _extends({}, state, {
        loading: false,
        visibleItemsPaged: [].concat(_toConsumableArray(state.visibleItemsPaged), [{
            page: currentPage,
            items: payload.response.data.data
        }]),
        visibleItems: [].concat(_toConsumableArray(state.visibleItems), _toConsumableArray(payload.response.data.data)),
        currentPage: currentPage,
        pagesLeft: (0, _utils.calculatePagesLeft)(payload.response.data.total, currentPage, pageLimit)
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemsLocations.request, function (state, params) {
    var startTimeOfRequest = params.startTimeOfRequest;

    return _extends({}, state, {
        locationItems: _extends({}, state.locationItems, {
            // items: [],
            loading: true,
            error: null,
            startTimeOfRequest: startTimeOfRequest
        })
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemsLocations.ok, function (state, payload) {
    var startTimeOfRequest = payload.request[0].startTimeOfRequest;
    if (startTimeOfRequest !== state.locationItems.startTimeOfRequest) {
        return state; // ignore requests that where overhauled by a later request
    }
    return _extends({}, state, {
        locationItems: _extends({}, state.locationItems, {
            loading: false,
            items: payload.response.data.data,
            error: null
        })
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemsLocations.error, function (state, payload) {
    return _extends({}, state, {
        locationItems: _extends({}, state.locationItems, {
            items: [],
            loading: false,
            error: payload.error
        })
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemDetail.request, function (state) {
    return _extends({}, state, {
        focusedItem: _extends({}, state.focusedItem, {
            loading: true,
            error: null
        })
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemDetail.ok, function (state, payload) {
    return _extends({}, state, {
        focusedItem: _extends({}, state.focusedItem, {
            loading: false,
            item: payload.response.data.data,
            error: null
        })
    });
}), _defineProperty(_createReducer, _asyncActions.fetchItemDetail.error, function (state, payload) {
    return _extends({}, state, {
        focusedItem: _extends({}, state.focusedItem, {
            loading: false,
            error: payload.error,
            item: null
        })
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
}), _createReducer), defaultsState);