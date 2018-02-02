'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchItemDetail = exports.fetchItemsNextPage = exports.fetchItemsLocations = exports.fetchItems = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActAsync = require('redux-act-async');

var _utils = require('../utils');

var _constants = require('../constants');

var _queryFormatter = require('../queryFormatter');

var fetchItems = exports.fetchItems = (0, _reduxActAsync.createActionAsync)(_constants.ACTION_PREFIX + '_ITEMS_FETCH', function (_ref, dispatch, getState) {
    var filterName = _ref.filterName,
        resource = _ref.resource,
        httpClient = _ref.httpClient,
        pageLimit = _ref.pageLimit,
        queryFormatter = _ref.queryFormatter;

    var currentQuery = getState().itemsFilter[filterName].currentQuery;
    var apiQuery = _extends({}, currentQuery, { limit: pageLimit, start: (0, _utils.calculateQueryOffset)(1, pageLimit) });

    return httpClient.get('/api' + resource + '?' + queryFormatter(apiQuery, { type: _queryFormatter.FORMAT_TO_REST_QUERYSTRING }));
});

var fetchItemsLocations = exports.fetchItemsLocations = (0, _reduxActAsync.createActionAsync)(_constants.ACTION_PREFIX + '_ITEMS_LOCATIONS_FETCH', function (_ref2, dispatch, getState) {
    var filterName = _ref2.filterName,
        resourceLocations = _ref2.resourceLocations,
        httpClient = _ref2.httpClient,
        queryFormatter = _ref2.queryFormatter;

    return httpClient.get('/api' + resourceLocations + '?' + queryFormatter(getState().itemsFilter[filterName].currentQuery, { type: _queryFormatter.FORMAT_TO_REST_QUERYSTRING }));
});

var fetchItemsNextPage = exports.fetchItemsNextPage = (0, _reduxActAsync.createActionAsync)(_constants.ACTION_PREFIX + '_ITEMS_FETCH_NEXT_PAGE', function (_ref3, dispatch, getState) {
    var filterName = _ref3.filterName,
        resource = _ref3.resource,
        httpClient = _ref3.httpClient,
        pageLimit = _ref3.pageLimit,
        queryFormatter = _ref3.queryFormatter;

    var currentPage = getState().itemsFilter[filterName].currentPage;
    var currentQuery = getState().itemsFilter[filterName].currentQuery;
    var queryForNextPage = _extends({}, currentQuery, { limit: pageLimit, start: (0, _utils.calculateQueryOffset)(currentPage + 1, pageLimit) });
    return httpClient.get('/api' + resource + '?' + queryFormatter(queryForNextPage, { type: _queryFormatter.FORMAT_TO_REST_QUERYSTRING }));
});

var fetchItemDetail = exports.fetchItemDetail = (0, _reduxActAsync.createActionAsync)(_constants.ACTION_PREFIX + '_ITEM_FETCH_DETAIL', function (_ref4) {
    var id = _ref4.id,
        resource = _ref4.resource,
        httpClient = _ref4.httpClient;

    return httpClient.get('/api' + resource + '/' + id);
});