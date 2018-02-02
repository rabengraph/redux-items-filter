'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withAsyncItemsFilter(WrappedComponent) {
    var AsyncItemsFilter = function (_Component) {
        _inherits(AsyncItemsFilter, _Component);

        function AsyncItemsFilter() {
            _classCallCheck(this, AsyncItemsFilter);

            return _possibleConstructorReturn(this, (AsyncItemsFilter.__proto__ || Object.getPrototypeOf(AsyncItemsFilter)).apply(this, arguments));
        }

        _createClass(AsyncItemsFilter, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var initializeFilter = this.props.initializeFilter;

                initializeFilter();
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props = this.props,
                    fetchItems = _props.fetchItems,
                    fetchItemsLocations = _props.fetchItemsLocations,
                    resourceLocations = _props.resourceLocations;

                fetchItems();
                resourceLocations && fetchItemsLocations();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _props2 = this.props,
                    fetchItems = _props2.fetchItems,
                    fetchItemsLocations = _props2.fetchItemsLocations,
                    currentQuery = _props2.currentQuery,
                    resourceLocations = _props2.resourceLocations;
                var oldQuery = prevProps.currentQuery,
                    filterInitialized = prevProps.filterInitialized;
                // make new http requests if a change in location detected and if in the previous state the filter instance is already initialized

                if (!(0, _utils.isQueryEqual)(currentQuery, oldQuery) && filterInitialized) {
                    fetchItems();
                    resourceLocations && fetchItemsLocations();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(WrappedComponent, this.props);
            }
        }]);

        return AsyncItemsFilter;
    }(_react.Component);

    AsyncItemsFilter.propTypes = {
        filterInitialized: _propTypes2.default.bool.isRequired,
        initializeFilter: _propTypes2.default.func.isRequired,
        fetchItems: _propTypes2.default.func.isRequired,
        fetchItemsLocations: _propTypes2.default.func.isRequired,
        resourceLocations: _propTypes2.default.string,
        currentQuery: _propTypes2.default.object.isRequired
    };

    AsyncItemsFilter.defaultProps = {
        pageLimit: 12
    };

    AsyncItemsFilter.displayName = 'AsyncItemsFilterHOC';
    return AsyncItemsFilter;
}

exports.default = withAsyncItemsFilter;