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

function withSyncItemsFilter(WrappedComponent) {
    var SyncItemsFilter = function (_Component) {
        _inherits(SyncItemsFilter, _Component);

        function SyncItemsFilter() {
            _classCallCheck(this, SyncItemsFilter);

            return _possibleConstructorReturn(this, (SyncItemsFilter.__proto__ || Object.getPrototypeOf(SyncItemsFilter)).apply(this, arguments));
        }

        _createClass(SyncItemsFilter, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var initializeFilter = this.props.initializeFilter;

                initializeFilter();
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var getItems = this.props.getItems;

                getItems();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _props = this.props,
                    getItems = _props.getItems,
                    currentQuery = _props.currentQuery;
                var oldQuery = prevProps.currentQuery,
                    filterInitialized = prevProps.filterInitialized;

                // make new calculation if a change in location detected and if in the previous state the filter instance is already initialized

                if (!(0, _utils.isQueryEqual)(currentQuery, oldQuery) && filterInitialized) {
                    getItems();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(WrappedComponent, this.props);
            }
        }]);

        return SyncItemsFilter;
    }(_react.Component);

    SyncItemsFilter.propTypes = {
        initializeFilter: _propTypes2.default.func.isRequired,
        getItems: _propTypes2.default.func.isRequired,
        currentQuery: _propTypes2.default.object.isRequired
    };

    SyncItemsFilter.defaultProps = {
        pageLimit: 12
    };

    SyncItemsFilter.displayName = 'SyncItemsFilterHOC';
    return SyncItemsFilter;
}

exports.default = withSyncItemsFilter;