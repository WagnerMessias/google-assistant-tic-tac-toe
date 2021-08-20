'use strict';

class Action {

    constructor(menu, panel, board){
      
    const that = this;
    this.panel = panel;
    this.menu = menu;
    this.board = board;
    this.currentData = "";

    this.commands = {
        MENU: function (data) {
          clickableElements = [];
          that.menu.showMenu(data.speech, data.buttons)
        },
        START: function (data) {
          that.clearCanvasGame();
          that.panel.updatePanel(data.panel, data.prompt);
          that.board.createBoard();
        },
        CONTINUE: function (data) {
          let play = that.currentData.play;
          that.clearCanvasGame();
          that.panel.updatePanel(data.panel, data.prompt);
          that.board.createBoard();
          that.board.markCurrentBoard(play.newBoard);
        },
        PANEL_UPDATE: function (data) {
          that.menu.showStartGame(data.speech, data.buttons)
        },
        MARK_POSITION: function (data) {
          that.currentData = data;
            that.board.markBoard(data.play.hPosition,data.play.hMarker);
            that.panel.showMessage(data.prompt);
        },
        MARK_DOUBLE_POSITION: function (data) {
          that.currentData = data;
          let play = data.play;
          console.log(play);
          console.log(`last play in mark double command`);
          that.board.markBoard(play.hPosition,play.hMarker);
          that.panel.showMessage(data.prompt);
          if((play.isWinner || play.tied) && play.lastToPlay === play.hMarker.toUpperCase()){
            sendQuery(play.querys.end_match);
          }else{
            sendQuery(play.querys.others_turn);
          }
        },
        MARK_POSITION_IA: function (data) {
          that.currentData = data;
          let play = data.play;
          that.clearCanvasGame();
          that.panel.updatePanel(data.panel, data.prompt);
          that.board.createBoard();
          that.board.markBoard(play.iaPosition,play.iaMarker);
        },
        END_MATCH: async function (data) {
          let play = that.currentData.play;
          console.log(play);
          console.log(`last play in end match command`);
          if(play.isWinner){
            that.board.markLineWinner(play.winningPositions,play.lastToPlay);
            await sleep(2000);
            that.clearCanvasGame();
            that.panel.wonMatch(data.prompt,play.lastToPlay);
          }else{
            that.clearCanvasGame();
            that.panel.tieMatch(data.prompt) 
          }
          await sleep(3000);
          sendQuery(play.querys.start_match);
        },
        SHOW_MESSAGE: function (data) {
          that.panel.showMessage(data.prompt);
        },
        TIMER: function () {
          setTimeout(() => {
            interactiveCanvas.sendTextQuery('instructions');
          }, data.timer * 1000);
        },
      };
    }

    clearCanvasGame(){
      clickableElements = [];
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    setCallbacks() {
      const that = this;
      const callbacks = {
        onUpdate(data) {
          try {
            that.commands[data.command.toUpperCase()](data);
          } catch (e) {
            // do nothing, when no command is sent or found
          }
        },
        onTtsMark(mark) {
          switch(mark){
            case 'OPPONENTS_TURN':
                // console.log(`TTS is OPPONENTS_TURN`);
                let d = that.currentData;
                console.log(d);
                console.log(`TTS is OPPONENTS_TURN ultimo data`);
                that.board.markBoard(d.play.iaPosition,d.play.iaMarker);
                if((d.play.isWinner || d.play.tied) && d.play.lastToPlay === d.play.iaMarker){
                  sendQuery(d.play.querys.end_match);
                }else{
                  sendQuery(d.play.querys.your_turn);
                }
              break
            case 'START':
                //console.log(`TTS is Start`);
              break
            case 'END':
                //console.log(`TTS is End`);
              break
            default:
                //console.log(`TTS is Erro`);
          }
        },
      };
      interactiveCanvas.ready(callbacks);
    }
}

// let play = {hPosition:position,
//   iaPosition:0,
//   hMarker:"",
//   iaMarker:"",
//   isValid:playIsValid,
//   matchType:match.type,
//   isWinner: false,
//   iaFirst:iaFirst,
//   champion:"",
//   newBoard: ""}