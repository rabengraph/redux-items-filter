'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../actions/index');

var _syncActions = require('../actions/syncActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, _ref) {
    var name = _ref.name;

    var itemsFilterState = state.itemsFilter[name];
    return {
        filterInitialized: itemsFilterState.filterInitialized,
        currentQuery: itemsFilterState.currentQuery,
        initialQuery: itemsFilterState.initialQuery,
        visibleItems: itemsFilterState.visibleItems,
        visibleItemsPaged: itemsFilterState.visibleItemsPaged,
        focusedItem: itemsFilterState.focusedItem.item,
        foundItemsCount: itemsFilterState.foundItemsCount,
        currentPage: itemsFilterState.currentPage,
        pagesLeft: itemsFilterState.pagesLeft,
        itemsView: itemsFilterState.itemsView,
        filterControllerVisible: itemsFilterState.filterControllerVisible
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var name = _ref2.name,
        filterCollectionReducer = _ref2.filterCollectionReducer,
        pageLimit = _ref2.pageLimit;

    // const { location: { query } } = ownProps;
    var resetQuery = function resetQuery() {
        dispatch((0, _index.resetQuery)({ filterName: name }));
    };
    return {
        initializeFilter: function initializeFilter() {
            dispatch((0, _index.initialize)({ filterName: name }));
        },
        setQuery: function setQuery(query) {
            dispatch((0, _index.setQuery)({ filterName: name, query: query }));
        },
        resetQuery: resetQuery,
        changeItemsView: function changeItemsView(itemsView) {
            dispatch((0, _index.changeItemsView)({ filterName: name, itemsView: itemsView }));
        },
        toggleFilterController: function toggleFilterController() {
            dispatch((0, _index.toggleFilterController)({ filterName: name }));
        },
        getItems: function getItems() {
            dispatch((0, _syncActions.getItems)({ filterName: name, filterCollectionReducer: filterCollectionReducer, pageLimit: pageLimit }));
        },
        getNextPage: function getNextPage() {
            dispatch((0, _syncActions.getItemsNextPage)({ filterName: name, pageLimit: pageLimit }));
        }
    };
};

function withSyncReduxState(WrappedComponent) {
    var WithSyncReduxState = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WrappedComponent);
    WithSyncReduxState.propTypes = {
        name: _propTypes2.default.string.isRequired,
        filterCollectionReducer: _propTypes2.default.func.isRequired,
        pageLimit: _propTypes2.default.number.isRequired
    };
    return WithSyncReduxState;
}

exports.default = withSyncReduxState;