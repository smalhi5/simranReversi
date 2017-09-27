//reversi.ja

/** The state of the game */
var state = {
  skip: 0,
  turn: 'b',
  rows: 8,
  cols: 8,
  moves: [],
  board: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, 'b', 'w', null, null, null],
    [null, null, null, 'w', 'b', null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ],
  captures: {w: 0, b: 0}
}

function getLegalMoves() {
        
        state.moves = [];
        // check all eight directions
        for (var row = 0; row < state.rows; row++) {
            
            for (var col = 0; col < state.cols; col++) {
                if(state.board[row][col] && state.board[row][col] !== state.turn){
                      for(var dir = 0; dir < 8; dir++){
                        if(canMove(row,col,dir) == true){
                          switch(dir){
                            case 0:
                              if(!state.board[row + 1][col]){
                                state.moves.push({row:row + 1, col:col, dir:dir});
                              }
                              break;
                            case 1:
                              if(!state.board[row + 1][col - 1]){
                                state.moves.push({row:row + 1, col:col - 1, dir:dir});
                              }
                              break;
                            case 2:
                              if(!state.board[row][col - 1]){
                                state.moves.push({row:row, col:col - 1, dir:dir});
                              }
                              break;
                            case 3:
                              if(!state.board[row - 1][col - 1]){
                                state.moves.push({row:row - 1, col:col - 1, dir:dir});
                              }
                              break;
                            case 4:
                              if(!state.board[row - 1][col]){
                                state.moves.push({row:row - 1, col:col, dir:dir});
                              }
                              break;
                            case 5:
                              if(!state.board[row - 1][col + 1]){
                                state.moves.push({row:row - 1, col:col + 1, dir:dir});
                              }
                              break;
                            case 6:
                              if(!state.board[row][col + 1]){
                                state.moves.push({row:row, col:col + 1, dir:dir});
                              }
                              break;
                            case 7:
                              if(!state.board[row + 1][col + 1]){
                                state.moves.push({row:row + 1, col:col + 1, dir:dir});
                              }
                              break;
                          
                          }//switch statement
                        }//if statement
                      }//direction forloop
                }//if statement
                
            }//inner forloop
        }//outer forloop

        if(state.moves.length == 0)
        {
          state.skip++;
        }else{
          state.skip = 0;
        }
        state.moves.forEach(function(move){
          var square = document.getElementById('square-' + move.col + '-' + move.row);
          square.classList.add('highlight');
          square.onclick = handleReversiClick;
        });
}

function canMove(row,col,dir){
  var x = col;
  var y = row;
  while(true){
    switch(dir){
      case 0:
        y = y - 1;
        break;
      case 1:
        y = y - 1;
        x = x + 1;
        break;
      case 2:
        x = x + 1;
        break;
      case 3:
        y = y + 1;
        x = x + 1;
        break;
      case 4:
        y = y + 1;
        break;
      case 5:
        y = y + 1;
        x = x - 1;
        break;
      case 6:
        x = x - 1;
        break;
      case 7:
        y = y - 1;
        x = x - 1;
        break;
    
    }
    if(!state.board[y][x]){
      return false;
    }
    if(state.board[y][x] === state.turn){
      return true;
    }
  }

}

function applyMove(row,col,dir){
  var x = col;
  var y = row;
  while(true){
    state.board[y][x] = state.turn;
    var square = document.getElementById('square-' + x + '-' + y);
    var reversi = document.createElement('div');
    reversi.classList.add('reversi');
    reversi.classList.add('reversi-' + state.board[y][x]);
    square.appendChild(reversi);
    switch(dir){
      case 0:
        y = y - 1;
        break;
      case 1:
        y = y - 1;
        x = x + 1;
        break;
      case 2:
        x = x + 1;
        break;
      case 3:
        y = y + 1;
        x = x + 1;
        break;
      case 4:
        y = y + 1;
        break;
      case 5:
        y = y + 1;
        x = x - 1;
        break;
      case 6:
        x = x - 1;
        break;
      case 7:
        y = y - 1;
        x = x - 1;
        break;
    
    }
    if(state.board[y][x] === state.turn){
      return;
    }
    square = document.getElementById('square-' + x + '-' + y);
    square.removeChild(square.firstChild);
  }

}

function clearHighlights() {
    var highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(function(square){
    square.classList.remove('highlight');
    square.onclick = undefined;
  });
}


//check who turn it is
function nextTurn() {
  if(state.turn === 'b') state.turn = 'w';
  else state.turn = 'b';
}

//clears the highlights
function clearHighlights() {
  var highlighted = document.querySelectorAll('.highlight');
  highlighted.forEach(function(square){
    square.classList.remove('highlight');
  });
}

//handle the click
function handleReversiClick(event) {
  event.preventDefault();
  var x = parseInt(event.target.charAt(7));
  var y = parseInt(event.target.charAt(9));
  // Clear old highlights
  clearHighlights();
  // Mark squares available for moves
  state.moves.forEach(function(move){
    if(move.col === x && move.row == y) {
      applyMove(move.row,move.col,move.dir);
    }
  });
  do{
    if(state.skip == 2){
      for(var row = 0; row < state.rows; row++){
        for(var col = 0; col < state.cols; col++){
          if(state.board[row][col] === 'b'){
            state.captures['b']++;
          }else{
            state.captures['w']++;
          }
        }
      }
      if(state.captures['b'] > state.captures['w']){
        alert('Black Wins');
      }else{
        alert('White Wins');
      }
      return;
    }
    if(state.turn === 'b'){
      state.turn = 'w';
    }else{
      state.turn = 'b';
    }
  }while(!getLegalMoves())
}

//setup
function setup() {
  var board = document.createElement('section');
  board.id = 'game-board';
  document.body.appendChild(board);
  for(var y = 0; y < state.board.length; y++){
    for(var x = 0; x < state.board[y].length; x++){
      var square = document.createElement('div');
      square.id = "square-" + x + "-" + y;
      square.classList.add('square');
      if((y+x) % 2 === 1) square.classList.add('black');
      board.appendChild(square);
      if(state.board[y][x]) {
        var reversi = document.createElement('div');
        reversi.classList.add('reversi');
        reversi.classList.add('reversi-' + state.board[y][x]);
        square.appendChild(reversi);
      }
    }
  }
}

setup();
//getLegalMoves();