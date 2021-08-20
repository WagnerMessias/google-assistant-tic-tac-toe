const storage = require('../data/local');
const utils = require('../helpers/utils');
const menuhHelper = require('../helpers/menu.helper');
const {context} = require('../helpers/contexts');


// Intents
function goToMenu(conv) {
    let match = storage.getValueStorage(conv,'match');
    let textMenu = speech.get('MENU_CHOOSE_OPTION');
    if(match.progress){
        textMenu = speech.get('MENU_CHOOSE_OPTION_CONTINUE');
    }
    
    conv.ask(textMenu);
    let canvasSpeech = {line1:textMenu};
    showMenu(conv,canvasSpeech);
}

function goToMenuOption(conv,{option}){
    switch(option){
        // case 'difficulty':
        //     showDifficultyMenu(conv);
        //     break;
        case 'marker':
            showMarkerMenu(conv);
            break;
        case 'who_starts':
            showWhoStartsMenu(conv);
            break;
        default:
        goToMenu(conv);
    }
}

function chooseDifficulty(conv, {difficulty}){
    storage.setValueStorage(conv,'difficulty',difficulty);
    storage.setValueStorage(conv,'progress',false);
    conv.ask("Ok, alterado dificuldade");
    goToMenu(conv);
}

function chooseMarker(conv, {marker}){
    storage.setValueStorage(conv,'marker',marker);
    storage.setValueStorage(conv,'progress',false);
    menuhHelper.setPlayerMarker(conv);
    conv.ask("Ok, alterado marcador");//TODO: aa 
    goToMenu(conv);
}

function chooseWhoStarts(conv, {who_starts}){
    storage.setValueStorage(conv,'who_starts',who_starts);
    storage.setValueStorage(conv,'progress',false);
    menuhHelper.setPlayerStarts(conv);
    conv.ask("Ok, alterado quem inicia");
    goToMenu(conv);
}

//Show menus

function showMenu(conv,canvasSpeech){
    let buttons = menuhHelper.getMenu(conv);
    utils.runCommand(conv,"menu",canvasSpeech,buttons);
}

function showDifficultyMenu(conv){
    let question = speech.get('CHOOSE_DIFFICULTY_QUESTION');
    conv.ask(question);
    let canvasSpeech = {line1:question};
    let buttons = menuhHelper.getDifficultyMenu();
    utils.runCommand(conv,"menu",canvasSpeech,buttons);
}

function showMarkerMenu(conv){
    let questionOne = speech.get('CHOOSE_MARKER_QUESTION_ONE');
    let questionTwo = speech.get('CHOOSE_MARKER_QUESTION_TWO');
    let questionTwoSpeech = speech.get('CHOOSE_MARKER_QUESTION_SPEECH');
    conv.ask(questionOne);
    conv.ask(questionTwoSpeech);
    let canvasSpeech = {line1:questionOne,line2:questionTwo,};
    let buttons = menuhHelper.getMarkerMenu();
    utils.runCommand(conv,"menu",canvasSpeech,buttons);
}

function showWhoStartsMenu(conv){
    let question = speech.get('CHOOSE_WHO_STARTS_QUESTION');
    conv.ask(question);
    let canvasSpeech = {line1:question};
    let buttons = menuhHelper.getWhoStartsMenu();
    utils.runCommand(conv,"menu",canvasSpeech,buttons);
}

const intents = {'go-to-menu': goToMenu,
                 'go-to-specify-menu-option': goToMenuOption, 
                 'choose-difficulty':chooseDifficulty,
                 'choose-marker': chooseMarker,
                 'choose-who-starts': chooseWhoStarts,};

exports.menuHandleIntent = (conv, ...args) => {
    conv.contexts.delete(context.MATCH);
    return intents[conv.intent](conv, ...args);
};