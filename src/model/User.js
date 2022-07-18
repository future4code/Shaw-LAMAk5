"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.toUserModel = exports.stringToUserRole = exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    User.prototype.setId = function (id) {
        this.id = id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.setRole = function (role) {
        this.role = role;
    };
    return User;
}());
exports.User = User;
var stringToUserRole = function (input) {
    switch (input) {
        case "NORMAL":
            return UserRole.NORMAL;
        case "ADMIN":
            return UserRole.ADMIN;
        default:
            throw new Error("Invalid user role");
    }
};
exports.stringToUserRole = stringToUserRole;
var toUserModel = function (user) {
    return new User(user.id, user.name, user.email, user.password, (0, exports.stringToUserRole)(user.role));
};
exports.toUserModel = toUserModel;
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "NORMAL";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
