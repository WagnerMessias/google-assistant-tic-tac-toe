const {HtmlResponse} = require('actions-on-google');

const storage = require('../data/local');

exports.setPlayer = (conv) => {
    let players = storage.getValueStorage(conv,'players');
    players.p1.marker = "";
    players.p2.marker = "";

    let marker = storage.getValueStorage(conv,'marker');

    let playerOld = players;

    if(storage.getValueStorage(conv,'who_starts') === 'you'){
      players.p1.name = 'Você';
      players.p2.name = 'Oponente';
      players.p1.marker = marker;
      players.p2.marker =  (marker === 'X') ? 'O': 'X';
      players.p1.type = 'you';
      players.p2.type = 'others';

      if(playerOld.p1.type !==  "you"){
        players.p1.score = playerOld.p2.score;
        players.p2.score = playerOld.p1.score;  
      }

  }else{
      players.p1.name = 'Oponente';
      players.p2.name = 'Você';
      players.p2.marker = marker;
      players.p1.marker =  (marker === 'X') ? 'O': 'X';
      players.p1.type = 'others';
      players.p2.type = 'you';

      if(playerOld.p1.type !==  "others"){
        players.p1.score = playerOld.p2.score;
        players.p2.score = playerOld.p1.score;  
      }
  }

    storage.setValueStorage(conv,'players',players);

}

exports.runCommand = (conv, command, canvasSpeech, buttons) => {
    conv.ask(new HtmlResponse({data:{command:command,
                                     speech:canvasSpeech,
                                     buttons:buttons}}))
}

exports.runCommandPanel = (conv, command, prompt, panel, play) => {
    conv.ask(new HtmlResponse({data:{command:command,
                                     prompt:prompt,
                                     panel:panel,
                                     play:play}}))
}

exports.runCommandBoard = (conv, command, prompt, play) => {
    conv.ask(new HtmlResponse({data:{command:command,
                                     prompt:prompt,
                                     play:play}}))
}