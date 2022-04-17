"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var marked = require("marked");
var sanitizeHtml = require("sanitize-html");
var worker = self;
worker.addEventListener('message', function (event) {
    var text = event.data;
    var html = sanitizeHtml(marked(text), { allowedTags: __spreadArrays(sanitizeHtml.defaults.allowedTags, ['h1', 'h2']) });
    worker.postMessage({ html: html });
});
