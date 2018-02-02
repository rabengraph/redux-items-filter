'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = exports.toggleFilterController = exports.changeItemsView = exports.resetQuery = exports.setQuery = undefined;

var _reduxAct = require('redux-act');

var _constants = require('../constants');

var setQuery = exports.setQuery = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_SET_QUERY');
var resetQuery = exports.resetQuery = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_RESET_QUERY');

var changeItemsView = exports.changeItemsView = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_CHANGE_ITEMS_VIEW');
var toggleFilterController = exports.toggleFilterController = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_TOGGLE_FILTERCONTROLLER');
var initialize = exports.initialize = (0, _reduxAct.createAction)(_constants.ACTION_PREFIX + '_INIT');