"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
var constant_1 = require("./constant");
var Game_1 = require("./Game");
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    GameManager.prototype.addUser = function (socket) {
        this.users.push(socket);
        this.addHandler(socket);
    };
    GameManager.prototype.removeUser = function (socket) {
        this.users = this.users.filter(function (user) { return user === socket; });
    };
    GameManager.prototype.addHandler = function (socket) {
        var _this = this;
        socket.on("message", function (data) {
            var message = JSON.parse(data.toString());
            console.log("🚀 ~ GameManager ~ socket.on ~ message:", message);
            if (message.type === constant_1.INIT_GAME) {
                if (_this.pendingUser) {
                    //start the game
                    var game = new Game_1.Game(_this.pendingUser, socket);
                    _this.games.push(game);
                    _this.pendingUser = null;
                }
                else {
                    _this.pendingUser = socket;
                }
            }
            if (message.type === constant_1.MOVE) {
                var game = _this.games.find(function (game) { return game.player1 === socket || game.player2 === socket; });
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    };
    return GameManager;
}());
exports.GameManager = GameManager;
