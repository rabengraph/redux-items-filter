'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _asyncItemsFilter = require('./asyncItemsFilter');

var _asyncItemsFilter2 = _interopRequireDefault(_asyncItemsFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createAsyncItemsFilterReducer = function createAsyncItemsFilterReducer() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var mergedInitialState = {};
    for (var property in initialState) {
        if (initialState.hasOwnProperty(property)) {
            mergedInitialState[property] = _extends({}, _asyncItemsFilter.defaultsState, initialState[property]);
        }
    }
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mergedInitialState;
        var action = arguments[1];

        var filterName = null;

        if (action.filterName) {
            filterName = action.filterName;
        }
        if (action.payload && action.payload.filterName) {
            filterName = action.payload.filterName;
        }
        if (action.payload && action.payload.request && action.payload.request[0] && action.payload.request[0].filterName) {
            filterName = action.payload.request[0].filterName;
        }
        if (filterName) {
            return _extends({}, state, _defineProperty({}, filterName, (0, _asyncItemsFilter2.default)(state[filterName], action)));
        }
        return state;
    };
};

exports.default = createAsyncItemsFilterReducer;