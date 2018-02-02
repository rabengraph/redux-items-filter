'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _utils = require('../utils');

var _queryFormatter = require('../queryFormatter');

var _queryParser = require('../queryParser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withRouter(WrappedComponent) {
    var WithRouter = function (_Component) {
        _inherits(WithRouter, _Component);

        function WithRouter() {
            _classCallCheck(this, WithRouter);

            return _possibleConstructorReturn(this, (WithRouter.__proto__ || Object.getPrototypeOf(WithRouter)).apply(this, arguments));
        }

        _createClass(WithRouter, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    currentQuery = _props.currentQuery,
                    locationSearch = _props.location.search,
                    setQuery = _props.setQuery,
                    queryParser = _props.queryParser;
                // location from router overrides the initial query from state,

                if (!(0, _utils.isQueryEqual)(currentQuery, queryParser(locationSearch, { type: _queryParser.PARSE_FROM_QUERYSTRING }))) {
                    setQuery(queryParser(locationSearch, { type: _queryParser.PARSE_FROM_QUERYSTRING }));
                }
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _props2 = this.props,
                    currentQuery = _props2.currentQuery,
                    changeLocation = _props2.changeLocation,
                    locationSearch = _props2.location.search,
                    setQuery = _props2.setQuery,
                    queryParser = _props2.queryParser;
                var oldQuery = prevProps.currentQuery;
                // a change in the query was detected, we update the location in the router

                if (!(0, _utils.isQueryEqual)(oldQuery, currentQuery)) {
                    changeLocation(currentQuery);
                    // a change in the location was detected (back button), we update the query
                } else if (!(0, _utils.isQueryEqual)(oldQuery, queryParser(locationSearch, { type: _queryParser.PARSE_FROM_QUERYSTRING }))) {
                    setQuery(queryParser(locationSearch, { type: _queryParser.PARSE_FROM_QUERYSTRING }));
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(WrappedComponent, this.props);
            }
        }]);

        return WithRouter;
    }(_react.Component);

    WithRouter.propTypes = {
        location: _propTypes2.default.object.isRequired,
        currentQuery: _propTypes2.default.object.isRequired,
        setQuery: _propTypes2.default.func.isRequired,
        changeLocation: _propTypes2.default.func.isRequired,
        queryParser: _propTypes2.default.func.isRequired
    };

    WithRouter.displayName = 'ItemsFilterWithRouterHOC';

    var mapStateToProps = function mapStateToProps() {
        return {};
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
        var queryFormatter = _ref.queryFormatter,
            pathname = _ref.location.pathname;

        return {
            changeLocation: function changeLocation(query) {
                dispatch((0, _reactRouterRedux.push)({
                    pathname: pathname,
                    search: '?' + queryFormatter(query, { type: _queryFormatter.FORMAT_TO_QUERYSTRING })
                }));
            }
        };
    };
    var ConnectedWithRouter = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WithRouter);

    ConnectedWithRouter.propTypes = {
        location: _propTypes2.default.object.isRequired,
        queryFormatter: _propTypes2.default.func.isRequired
    };
    return ConnectedWithRouter;
}
exports.default = withRouter;