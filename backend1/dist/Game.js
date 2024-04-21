"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var chess_js_1 = require("chess.js");
var constant_1 = require("./constant");
var Game = /** @class */ (function () {
    function Game(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: constant_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: constant_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    Game.prototype.makeMove = function (socket, move) {
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: constant_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.emit(JSON.stringify({
                type: constant_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            console.log("inside player2 called");
            this.player2.send(JSON.stringify({
                type: constant_1.MOVE,
                payload: move,
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: constant_1.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
    };
    return Game;
}());
exports.Game = Game;
