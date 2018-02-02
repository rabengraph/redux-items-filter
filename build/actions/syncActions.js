'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemsNextPage = exports.getItems = undefined;

var _reduxAct = require('redux-act');

var _constants = require('../constants');

var getItems = exports.getItems = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_ITEMS_GET');
// import { calculateQueryOffset } from '../utils';
var getItemsNextPage = exports.getItemsNextPage = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_ITEMS_GET_NEXT_PAGE');

// export const getItemsNextPage = createActionAsync('MODELFILTER_ITEMS_FETCH_NEXT_PAGE', ({filterName, resource, httpClient, pageLimit, restapiStringify}, dispatch, getState) => {
//     const currentPage = getState().modelFilter[filterName].currentPage;
//     const currentQuery = getState().modelFilter[filterName].currentQuery;
//     const queryForNextPage = { ...currentQuery, limit: pageLimit, start: calculateQueryOffset(currentPage + 1, pageLimit)};
//     return httpClient.get(`/api${resource}?${restapiStringify(queryForNextPage)}`);
// });

// export const getItemDetail = createActionAsync('MODELFILTER_ITEM_FETCH_DETAIL', ({id, resource, httpClient}) => {
//     return httpClient.get(`/api${resource}/${id}`);
// });