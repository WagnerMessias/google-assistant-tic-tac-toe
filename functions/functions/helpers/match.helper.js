const storage = require('../data/local');

exports.resetBoard = (conv) => {
    let match = storage.getValueStorage(conv,'match')
    match.board = [0,1,2,3,4,5,6,7,8];
    match.lastPlay = null;
    storage.setValueStorage(conv,'match',match);
}

// exports.setPlayer = (conv) => {
//     let players = storage.getValueStorage(conv,'players');
//     players.p1.marker = "";
//     players.p2.marker = "";

//     let marker = storage.getValueStorage(conv,'marker');

//     if(storage.getValueStorage(conv,'who_starts') === 'you'){
//       players.p1.name = 'Você';
//       players.p2.name = 'Oponente';
//       players.p1.marker = marker;
//       players.p2.marker =  (marker === 'X') ? 'O': 'X';
//       players.p1.type = 'you';
//       players.p2.type = 'others';
//   }else{
//       players.p1.name = 'Oponente';
//       players.p2.name = 'Você';
//       players.p2.marker = marker;
//       players.p1.marker =  (marker === 'X') ? 'O': 'X';
//       players.p1.type = 'others';
//       players.p2.type = 'you';
//   }
//     storage.setValueStorage(conv,'players',players);

// }

function playIsValid(board,position){

    if(board[position] !== "X"  && board[position] !== "O"){
        return true;
    }else{
        return false;
    }
}

exports.runPlay = (conv,position, iaFirst) => {
    let match = storage.getValueStorage(conv,'match')
    let players = storage.getValueStorage(conv,'players');

    let play = getDefaultPlay();

    play.hPosition = position;
    play.matchType = match.type;
    play.iaFirst = iaFirst;
  
    if(!iaFirst && !playIsValid(match.board,position)){
        play.isValid = false;
        return play;
    }

    if(match.type === "single"){
        play = singlePlay(conv,play,players,match);
    }else{
        //TODO: fazer versus
    }

    //logica do campeao salvar dados
    if(play.isWinner){
      if(players.p1.marker === play.lastToPlay){
        players.p1.score = players.p1.score + 1;
      }else{
        players.p2.score = players.p2.score + 1;
      }
    }

    match.lastPlay = play;
    match.board = play.newBoard;
    storage.setValueStorage(conv,'match',match);
    storage.setValueStorage(conv,'players',players);

    return play;
}

function singlePlay(conv,play,players,match){

    if(players.p1.type === "you"){
        play.iaMarker = players.p2.marker.toUpperCase();
        play.hMarker  = players.p1.marker.toUpperCase();
      }else{
        play.hMarker = players.p2.marker.toUpperCase();
        play.iaMarker = players.p1.marker.toUpperCase();
      }

      aiPlayer = play.iaMarker;
      huPlayer = play.hMarker;
      console.log("ia first : "+ play.iaFirst);
      console.log(play);

      if(!play.iaFirst){
        console.log("nao era para entrar aqui");
        match.board[play.hPosition] = huPlayer;
        
        if(isEndMatch(match.board,play,huPlayer,"YOU")){
          return play;          
        }
      }
      
      let resultIA = minimax(match.board,play.iaMarker);
      
      play.iaPosition = resultIA.index;
      match.board[resultIA.index] = play.iaMarker;

      play.newBoard = match.board;
      isEndMatch(play.newBoard,play,aiPlayer,"OTHERS");
      console.log("is end match");
      return play;
}

function isEndMatch(board,play,player,typePlayer){
  let result = hasWon(board,player);
  play.lastToPlay = player;

  if(result.value){
    play.isWinner = true;
    play.winningPositions = result.winningPositions;
    return true;
  }

  let availSpots = emptyIndexies(board);

  if(availSpots.length === 0){
    play.tied = true;
    return true;
  }

  return false
}

function getDefaultPlay(){
  let play = {hPosition:0,
    iaPosition:0,
    hMarker:"",
    iaMarker:"",
    isValid:true,
    matchType:"single",
    tied:false,
    isWinner: false,
    iaFirst:true,             
    lastToPlay:"",
    winningPositions:[],
    newBoard: "",
    querys:{your_turn: speech.get('QUERY_YOUR_TURN'),
            others_turn: speech.get('QUERY_OTHERS_TURN'),
            end_match: speech.get('QUERY_END_MATCH'),
            start_match: speech.get('QUERY_START_MATCH')
          }
          }

    return play;
}

exports.getPanelInformations = (conv) => {
    let players = storage.getValueStorage(conv,'players');

    panel = {p1:{name:players.p1.name,
                 marker:players.p1.marker.toUpperCase(), 
                 score: players.p1.score.toString()},
             p2:{name:players.p2.name,
                 marker:players.p2.marker.toUpperCase(), 
                 score: players.p2.score.toString()}}
    return panel;             
}

//Minimax
var huPlayer = "";
var aiPlayer = "";
var fc = 0;

function minimax(newBoard, player){ 
  fc++;
      var availSpots = emptyIndexies(newBoard);

      if (winning(newBoard, huPlayer)){
        return {score:-10};
      }else if (winning(newBoard, aiPlayer)){
        return {score:10};
      }else if (availSpots.length === 0){
        return {score:0};
      }

  var moves = [];

  for (var i = 0; i < availSpots.length; i++){
    var move = {};
  	move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    if (player === aiPlayer){
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }else{
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if(player === aiPlayer){
    let bestScore = -1000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
    let bestScore = 1000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

function emptyIndexies(board){
  return  board.filter(s => s !== "O" && s !== "X");
}

function winning(board, player){
  return hasWon(board, player).value;
}

function hasWon(board, player){
  let r = {winningPositions:[],value:true}
  
  if(board[0] === player && board[1] === player && board[2] === player){
    r.winningPositions = [0,1,2];
  }else if(board[3] === player && board[4] === player && board[5] === player) {
    r.winningPositions = [3,4,5];
  }else if(board[6] === player && board[7] === player && board[8] === player) {
    r.winningPositions = [6,7,8];
  }else if(board[0] === player && board[3] === player && board[6] === player) {
    r.winningPositions = [0,3,6];
  }else if(board[1] === player && board[4] === player && board[7] === player) {
    r.winningPositions = [1,4,7];
  }else if(board[2] === player && board[5] === player && board[8] === player) {
    r.winningPositions = [2,5,8];
  }else if(board[0] === player && board[4] === player && board[8] === player) {
    r.winningPositions = [0,4,8];
  }else if(board[2] === player && board[4] === player && board[6] === player){
    r.winningPositions = [2,4,6];    
  }else {
    return r.value = false;
  }
  return r;
 }