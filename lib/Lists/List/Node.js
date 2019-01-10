"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var containers_1 = require("../../containers");
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node(value) {
        return _super.call(this, value) || this;
    }
    Object.defineProperty(Node.prototype, "link", {
        get: function () {
            return this.right;
        },
        set: function (node) {
            this.right = node;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.clone = function () {
        var root = _super.prototype.clone.call(this);
        var temp = root;
        while (temp.right) {
            temp.link = temp.right;
            temp = temp.link;
        }
        return root;
    };
    return Node;
}(containers_1.Node));
exports.default = Node;
