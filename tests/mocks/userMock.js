"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserMock = exports.userMock = void 0;
var User_1 = require("../../src/model/User");
exports.userMock = new User_1.User("id_user_1", "user1", "user1@gmail.com", "user1password", User_1.UserRole.NORMAL);
exports.adminUserMock = new User_1.User("id_user_2", "user2", "user2@gmail.com", "user2password", User_1.UserRole.ADMIN);
