const storage = require('../data/local');

exports.setPlayerMarker = (conv) => {
    let players = storage.getValueStorage(conv,'players');
    let marker = storage.getValueStorage(conv,'marker');

    if(players.p1.type === 'you'){
      players.p1.marker = marker;
      players.p2.marker =  (marker === 'X') ? 'O': 'X';
    }else{
      players.p2.marker = marker;
      players.p1.marker =  (marker === 'X') ? 'O': 'X';
    }
    storage.setValueStorage(conv,'players',players);
}

exports.setPlayerStarts = (conv) => {
  
  let players = storage.getValueStorage(conv,'players');
  console.log(players);
  let p1 =  players.p1;
  let p2 =  players.p2;

  players.p1 = p2;
  players.p2 = p1; 
  console.log(players)
  storage.setValueStorage(conv,'players',players);
}



exports.getMenu = (conv) => {
  let match = storage.getValueStorage(conv,'match');
  let buttons = [];

  let queryStarting = speech.get('MENU_BTN_START_QUERY');
  let texButtontStarting = speech.get('MENU_BTN_TEXT_START');

  if(match.progress){
    queryStarting = speech.get('MENU_BTN_CONTINUE_QUERY');
    texButtontStarting = speech.get('MENU_BTN_TEXT_CONTINUE');
  }

  buttons.push({id:"starting",text:texButtontStarting,query:queryStarting});
  //buttons.push({id:"difficulty",text:speech.get('MENU_BTN_TEXT_DIFFICULTY'),query:speech.get('MENU_BTN_DIFFICULTY_QUERY'),subtitle:speech.get(storage.getValueStorage(conv,'difficulty'))});
  buttons.push({id:"marker",text:speech.get('MENU_BTN_TEXT_MARKER'),query:speech.get('MENU_BTN_MARKER_QUERY'),subtitle:speech.get(storage.getValueStorage(conv,'marker'))});
  buttons.push({id:"who_starts",text:speech.get('MENU_BTN_TEXT_WHO_STARTS'),query:speech.get('MENU_BTN_WHO_STARTS_QUERY'),subtitle:speech.get(storage.getValueStorage(conv,'who_starts'))});
  return buttons; 
}

exports.getMarkerMenu = () => {
  let buttons = [];
  buttons.push({id:"x", text:speech.get('X'),query:speech.get('CHOSEN_X_QUERY')});
  buttons.push({id:"circle", text:speech.get('CIRCLE'),query:speech.get('CHOSEN_CIRCLE_QUERY')}); 
  return buttons;
}

exports.getWhoStartsMenu = () => {
  let buttons = [];
  buttons.push({id:"you", text:speech.get('YOU'),query:speech.get('CHOSEN_YOU_QUERY')});
  buttons.push({id:"others", text:speech.get('OTHERS'),query:speech.get('CHOSEN_OTHERS_QUERY')});
  return buttons;
}

exports.getDifficultyMenu = () => {
  let buttons = [];
  buttons.push({id:"easy", text:speech.get('EASY'),query:speech.get('CHOSEN_EASY_QUERY')});
  buttons.push({id:"medium", text:speech.get('MEDIUM'),query:speech.get('CHOSEN_MEDIUM_QUERY')}); 
  buttons.push({id:"hard", text:speech.get('HARD'),query:speech.get('CHOSEN_HARD_QUERY')});
  return buttons;
}
