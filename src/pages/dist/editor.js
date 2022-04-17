"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Editor = void 0;
var React = require("react");
var styled_components_1 = require("styled-components");
var react_router_dom_1 = require("react-router-dom");
var memos_1 = require("../indexeddb/memos");
var button_1 = require("../components/button");
var saveModal_1 = require("../components/saveModal");
var header_1 = require("../components/header");
var convertMarkdownWorker_1 = require("worker-loader!../worker/convertMarkdownWorker");
var convertMarkdownWorker = new convertMarkdownWorker_1["default"]();
var useState = React.useState, useEffect = React.useEffect;
exports.Editor = function (props) {
    var text = props.text, setText = props.setText;
    var _a = useState(false), showModal = _a[0], setShowModal = _a[1];
    var _b = useState(''), html = _b[0], setHtml = _b[1];
    useEffect(function () {
        convertMarkdownWorker.onmessage = function (event) {
            setHtml(event.data.html);
        };
    }, []);
    useEffect(function () {
        convertMarkdownWorker.postMessage(text);
    }, [text]);
    var onSave = function (title) {
        memos_1.putMemo(title, text);
        setShowModal(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(HeaderArea, null,
            React.createElement(header_1.Header, { title: "Markdown Editor" },
                React.createElement(button_1.Button, { onClick: function () { return setShowModal(true); } }, "\u4FDD\u5B58\u3059\u308B"),
                React.createElement(react_router_dom_1.Link, { to: "/history" }, "\u5C65\u6B74\u3092\u898B\u308B"))),
        React.createElement(Wrapper, null,
            React.createElement(TextArea, { onChange: function (event) { setText(event.target.value); }, value: text }),
            React.createElement(Preview, null,
                React.createElement("div", { dangerouslySetInnerHTML: { __html: html } }))),
        showModal && (React.createElement(saveModal_1.SaveModal, { onSave: onSave, onCancel: function () { return setShowModal(false); } }))));
};
var Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    bottom: 0;\n\tleft: 0;\n\tposition: fixed;\n\tright: 0;\n\ttop: 3rem;\n  "], ["\n    bottom: 0;\n\tleft: 0;\n\tposition: fixed;\n\tright: 0;\n\ttop: 3rem;\n  "])));
var HeaderArea = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tposition: fixed;\n\tright: 0;\n\ttop: 0;\n    left: 0;\n"], ["\n\tposition: fixed;\n\tright: 0;\n\ttop: 0;\n    left: 0;\n"])));
var TextArea = styled_components_1["default"].textarea(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tborder-right: 1px solid silver;\n\tborder-top: 1px solid silver;\n\tbottom: 0;\n\tfont-size: 1rem;\n\tleft: 0;\n\tpadding: 0.5rem;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 50vw;\n"], ["\n\tborder-right: 1px solid silver;\n\tborder-top: 1px solid silver;\n\tbottom: 0;\n\tfont-size: 1rem;\n\tleft: 0;\n\tpadding: 0.5rem;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 50vw;\n"])));
var Preview = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tborder-top: 1px solid silver;\n\tbottom: 0;\n\toverflow-y: scroll;\n\tpadding: 1rem;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\twidth: 50vw;\n"], ["\n\tborder-top: 1px solid silver;\n\tbottom: 0;\n\toverflow-y: scroll;\n\tpadding: 1rem;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\twidth: 50vw;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
