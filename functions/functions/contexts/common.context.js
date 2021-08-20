const storage = require('../data/local');
const utils = require('../helpers/utils');
const {HtmlResponse} = require('actions-on-google');
const {context} = require('../helpers/contexts');

function welcome(conv) {

    if(conv.surface.capabilities.has('actions.capability.INTERACTIVE_CANVAS')){
        let textWelcome = speech.get('WELCOME_GUEST');

        if(conv.user.verification === 'VERIFIED' && !conv.user.storage.isFirstAccess){
            textWelcome = speech.get('WELCOME_VERIFIED');
        }
       
        let textMenu = speech.get('MENU_CHOOSE_OPTION');
        let canvasSpeech = {line1:textWelcome,line2:textMenu,};

        conv.ask(textWelcome);
        conv.ask(textMenu);
        showMenu(conv,canvasSpeech);
    }else{
        conv.close(speech.get('SURFACE_INCOMPATIBLE')); 
    }
}

function showMenu(conv,canvasSpeech){
    let buttons = [];
    buttons.push({id:"starting",text:speech.get('MENU_BTN_TEXT_START'),query:speech.get('MENU_BTN_START_QUERY')});
    buttons.push({id:"marker",text:speech.get('MENU_BTN_TEXT_MARKER'),query:speech.get('MENU_BTN_MARKER_QUERY'),subtitle:speech.get(storage.getValueStorage(conv,'marker'))});
    buttons.push({id:"who_starts",text:speech.get('MENU_BTN_TEXT_WHO_STARTS'),query:speech.get('MENU_BTN_WHO_STARTS_QUERY'),subtitle:speech.get(storage.getValueStorage(conv,'who_starts'))});
    
    conv.ask(new HtmlResponse({
        url:'https://jogo-da-velha-a8b89.firebaseapp.com',
        data:{command:"menu", speech:canvasSpeech, buttons:buttons},
    }));
}

function fallback(conv) {
    if(conv.contexts.get(context.MATCH)){
        //prompt = speech.get('PROMPT_YOUR_TURN');
        conv.ask("na partida")
        utils.runCommandPanel(conv,"SHOW_MESSAGE","Não entendi, escolha uma posição valida entre 1 a 9");
    }else if(conv.contexts.get(context.MENU)){
        conv.ask("no menu fall")
        conv.ask(new HtmlResponse({
            data:{query: conv.query},
        }));
    }else{
        conv.ask("outro contexto")
    }
}

const intents = {'welcome': welcome,
                 'fallback':fallback};

exports.commonHandleIntent = (conv, ...args) => {
    return intents[conv.intent](conv, ...args);
};