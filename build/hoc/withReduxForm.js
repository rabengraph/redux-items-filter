'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _queryFormatter = require('../queryFormatter');

var _queryParser = require('../queryParser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, _ref) {
    var name = _ref.name,
        queryFormatter = _ref.queryFormatter;

    var itemsFilterState = state.itemsFilter[name];
    return {
        initialValues: queryFormatter(itemsFilterState.currentQuery, { type: _queryFormatter.FORMAT_TO_REDUX_FORM }),
        formValues: (0, _reduxForm.getFormValues)(name)(state),
        form: name
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var resetQuery = _ref2.resetQuery;

    return {
        resetForm: function resetForm() {
            dispatch((0, _reduxForm.reset)(name));
            resetQuery(); // is wrapped with dispatch
        }
    };
};

function withReduxForm(WrappedComponent) {
    var EnhancedWithForm = (0, _reduxForm.reduxForm)({
        enableReinitialize: true,
        onSubmit: function onSubmit(values, dispatch, props) {
            props.setQuery(props.queryParser(values, { type: _queryParser.PARSE_FROM_REDUX_FORM }));
        },
        onChange: function onChange(values, dispatch, props) /* ,previousValues */{
            // trigger submit immediately after form change
            setTimeout(function () {
                dispatch((0, _reduxForm.submit)(props.name));
            }, 0);
        }
    })(WrappedComponent);
    EnhancedWithForm.propTypes = {
        name: _propTypes2.default.string.isRequired,
        queryParser: _propTypes2.default.func.isRequired,
        setQuery: _propTypes2.default.func.isRequired
    };
    var WithReduxForm = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EnhancedWithForm);
    WithReduxForm.propTypes = {
        name: _propTypes2.default.string.isRequired,
        queryFormatter: _propTypes2.default.func.isRequired,
        resetQuery: _propTypes2.default.func.isRequired
    };
    return WithReduxForm;
}

exports.default = withReduxForm;