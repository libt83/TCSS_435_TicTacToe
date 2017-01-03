/*
    Brandon Semba
    Assignment 1
    10/24/2016

    This is an example of creating an AI agent for
    Tic-Tac-Toe using the minimax algorithm.
*/

var Agent = function () {

}

Agent.prototype.selectMove = function(board) {
    var isMax = true;
    var P1_turn = null;
    var move = 0;
    var bestMoveValue = -100;
    var freeCells = [];

    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)){
            freeCells.push(i);
        }
    }

    /*
        Iterates through the possible next states and performs
        the minimax on each of those states. It keeps the best
        value along with the move.
        This idea for getting the move from the minimax algorithm
        was derived from http://richard.to/programming/ai-for-owari-part-2.html
    */
    if(board.playerOne){
        P1_turn = true;
        for(var i = 0; i < freeCells.length; i++){
            var gb = board.clone();
            gb.move(freeCells[i]);
            var moveValue = minimax(gb, !isMax, P1_turn);
            if(moveValue > bestMoveValue){
                bestMoveValue = moveValue;
                move = freeCells[i];
            }
        }
    }else{
        P1_turn = false;
        for(var i = 0; i < freeCells.length; i++){
            var gb = board.clone();
            gb.move(freeCells[i]);
            var moveValue = minimax(gb, !isMax, P1_turn);
            if(moveValue > bestMoveValue){
                bestMoveValue = moveValue;
                move = freeCells[i];
            }
        }
    }
    return move;
}
// Performs the minimax algorithm
var minimax = function(board, isMax, active){

    if(active){
        if(board.gameOver() === 1){
            return 1;
        }
        if(board.gameOver() === 2){
            return - 1;
        }
        if(board.gameOver() === 3){
            return 0;
        }
    }

    if(!active){
        if(board.gameOver() === 1){
            return -1;
        }
        if(board.gameOver() === 2){
            return 1;
        }
        if(board.gameOver() === 3){
            return 0;
        }
    }

    if(isMax){
        var best = -1000;
        var freeCells = [];
        for (var i = 1; i < 10; i++) {
            if (board.cellFree(i)){
                freeCells.push(i);
            }
        }
        for(var i = 0; i < freeCells.length; i++){
            var gb = board.clone();
            gb.move(freeCells[i]);
            best = Math.max(best, minimax(gb, !isMax, active));
        }
        return best;
    }else{
        var worst = 1000;
        var freeCells = [];
        for (var i = 1; i < 10; i++) {
            if (board.cellFree(i)){
                freeCells.push(i);
            }
        }
        for(var i = 0; i < freeCells.length; i++){
            var gb = board.clone();
            gb.move(freeCells[i]);
            worst = Math.min(worst, minimax(gb, !isMax, active));
        }
        return worst;
    }
}
