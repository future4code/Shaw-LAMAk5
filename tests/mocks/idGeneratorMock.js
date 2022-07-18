"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGeneratorMock = void 0;
var IdGeneratorMock = /** @class */ (function () {
    function IdGeneratorMock() {
    }
    IdGeneratorMock.prototype.generate = function (input) {
        return "id";
    };
    return IdGeneratorMock;
}());
exports.IdGeneratorMock = IdGeneratorMock;
