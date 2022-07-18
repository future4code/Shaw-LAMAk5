"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
var Band = /** @class */ (function () {
    function Band(id, name, music_genre, responsible) {
        this.id = id;
        this.name = name;
        this.music_genre = music_genre;
        this.responsible = responsible;
    }
    Band.prototype.getId = function () {
        return this.id;
    };
    Band.prototype.getName = function () {
        return this.name;
    };
    Band.prototype.getMusicGenre = function () {
        return this.music_genre;
    };
    Band.prototype.getResponsible = function () {
        return this.responsible;
    };
    Band.toBandModel = function (band) {
        return new Band(band.id, band.name, band.music_genre, band.responsible);
    };
    return Band;
}());
exports.Band = Band;
