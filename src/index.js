"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var userRouter_1 = require("./routes/userRouter");
var showRouter_1 = require("./routes/showRouter");
var bandRouter_1 = require("./routes/bandRouter");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/show", showRouter_1.showRouter);
app.use("/band", bandRouter_1.bandRouter);
var server = app.listen(process.env.PORT || 3003, function () {
    if (server) {
        var address = server.address();
        console.log("Servidor rodando em http://localhost:".concat(address.port));
    }
    else {
        console.error("Falha ao rodar o servidor.");
    }
});
