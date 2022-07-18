"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = exports.weekDay = void 0;
var weekDay;
(function (weekDay) {
    weekDay["sexta"] = "sexta";
    weekDay["sabado"] = "sabado";
    weekDay["domingo"] = "domingo";
})(weekDay = exports.weekDay || (exports.weekDay = {}));
var Show = /** @class */ (function () {
    function Show(band_id, week_day, start_time, end_time) {
        var _this = this;
        this.band_id = band_id;
        this.week_day = week_day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.getWeek_day = function () { return _this.week_day; };
    }
    Show.prototype.getId = function () {
        return this.band_id;
    };
    Show.prototype.getStart_time = function () {
        return this.start_time;
    };
    Show.prototype.getEnd_time = function () {
        return this.end_time;
    };
    Show.toShowModel = function (show) {
        return new Show(show.band_id, show.week_day, show.start_time, show.end_time);
    };
    return Show;
}());
exports.Show = Show;
