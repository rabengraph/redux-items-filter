'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../actions/index');

var _asyncActions = require('../actions/asyncActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, _ref) {
    var name = _ref.name;

    var itemsFilterState = state.itemsFilter[name];
    return {
        filterInitialized: itemsFilterState.filterInitialized,
        loading: itemsFilterState.loading,
        currentQuery: itemsFilterState.currentQuery,
        initialQuery: itemsFilterState.initialQuery,
        visibleItems: itemsFilterState.visibleItems,
        visibleItemsPaged: itemsFilterState.visibleItemsPaged,
        locationItems: itemsFilterState.locationItems.items,
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
        resource = _ref2.resource,
        httpClient = _ref2.httpClient,
        pageLimit = _ref2.pageLimit,
        queryFormatter = _ref2.queryFormatter,
        resourceLocations = _ref2.resourceLocations;

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
        fetchItems: function fetchItems() {
            dispatch((0, _asyncActions.fetchItems)({ filterName: name, startTimeOfRequest: new Date(), resource: resource, httpClient: httpClient, pageLimit: pageLimit, queryFormatter: queryFormatter }));
        },
        fetchNextPage: function fetchNextPage() {
            dispatch((0, _asyncActions.fetchItemsNextPage)({ filterName: name, startTimeOfRequest: new Date(), resource: resource, httpClient: httpClient, pageLimit: pageLimit, queryFormatter: queryFormatter }));
        },
        fetchItemsLocations: function fetchItemsLocations() {
            dispatch((0, _asyncActions.fetchItemsLocations)({ filterName: name, startTimeOfRequest: new Date(), resourceLocations: resourceLocations, httpClient: httpClient, queryFormatter: queryFormatter }));
        },
        fetchItemDetail: function fetchItemDetail(id) {
            dispatch((0, _asyncActions.fetchItemDetail)({ filterName: name, resource: resource, httpClient: httpClient, id: id }));
        },
        changeItemsView: function changeItemsView(itemsView) {
            dispatch((0, _index.changeItemsView)({ filterName: name, itemsView: itemsView }));
        },
        toggleFilterController: function toggleFilterController() {
            dispatch((0, _index.toggleFilterController)({ filterName: name }));
        }
    };
};

function withAsyncReduxState(WrappedComponent) {
    var WithAsyncReduxState = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WrappedComponent);
    WithAsyncReduxState.propTypes = {
        name: _propTypes2.default.string.isRequired,
        resource: _propTypes2.default.string.isRequired,
        httpClient: _propTypes2.default.func.isRequired,
        pageLimit: _propTypes2.default.number.isRequired,
        queryFormatter: _propTypes2.default.func.queryFormatter,
        resourceLocations: _propTypes2.default.string.isRequired
    };
    return WithAsyncReduxState;
}

exports.default = withAsyncReduxState;