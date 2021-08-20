const {intent} = require('./helpers/intents');
const {menuHandleIntent} = require('./contexts/menu.context');
const {commonHandleIntent} = require('./contexts/common.context');
const {matchHandleIntent} = require('./contexts/match.context');
const functions = require('firebase-functions');
i18n = require('i18n');
const {dialogflow, HtmlResponse} = require('actions-on-google');
const app = dialogflow();

global.speech = {
    translation : null,
    get : function (key){
            let keyUpper = String(key).toUpperCase();
            let value = this.translation.__(keyUpper);
            if(typeof value === 'object'){
                let i = Math.floor(Math.random() * value.length);
                return  value[i];
            }else{
                return typeof value === 'string' ? value : "ops! Tente novamente";
            }
    }
}

i18n.configure({
    locales: ['en-US', 'pt-BR'],
    directory: __dirname + '/locales',
    defaultLocale: 'pt-BR'
});

app.middleware((conv) => {
    //TODO: contador de fallback
    i18n.setLocale(conv.user.locale);
    speech.translation = i18n;
    setUpGameOptions(conv);
    console.log("intent acionada"+ conv.intent);
});

function setUpGameOptions(conv){
    
    let match = {type:"single",
                 progress:false,
                 rounds:1,
                 turn:"p1",
                 board:[0,1,2,3,4,5,6,7,8],
                 lastPlay:null};

    let players = {p1:{name:"Você", marker:"X",type: "you",  score: 0},
                  p2:{name:"Adversário", marker:"O",type: "others", score: 0}
                };

    if(conv.user.verification === 'VERIFIED'){
        // conv.user.storage = {};
        let isFirstAccess = !("isFirstAccess"  in conv.user.storage);
        conv.user.storage.isFirstAccess = isFirstAccess;
        // console.log("isFirstAccess= "+ isFirstAccess);
        if(isFirstAccess){
            conv.user.storage.difficulty = "easy";
            conv.user.storage.marker = "X";
            conv.user.storage.whoStarts = "you";
            conv.user.storage.match = match;
            conv.user.storage.players = players;
        }
    }else{
        let isFirstAccess = !("isFirstAccess"  in conv.data);
        conv.data.isFirstAccess = isFirstAccess;
        if(isFirstAccess){
            conv.data.difficulty = "easy";
            conv.data.marker = "X";
            conv.data.whoStarts = "you";
            conv.data.match = match;
            conv.data.players = players;
        }
    }
}

//Common
app.intent(intent.WELCOME, commonHandleIntent);
app.intent(intent.FALLBACK, commonHandleIntent);

//Menu
app.intent(intent.CHOOSE_DIFFICULTY, menuHandleIntent);
app.intent(intent.CHOOSE_SYMBOL, menuHandleIntent);
app.intent(intent.CHOOSE_WHO_STARTS, menuHandleIntent);
app.intent(intent.GO_TO_MENU, menuHandleIntent);
app.intent(intent.GO_TO_SPECIFY_MENU_OPTION, menuHandleIntent);

//MATCH
app.intent(intent.START_MATCH, matchHandleIntent);
app.intent(intent.CONTINUE_MATCH, matchHandleIntent);
app.intent(intent.MARK_POSITION, matchHandleIntent);
app.intent(intent.ANNOUNCE, matchHandleIntent);



//Board
exports.webhookjogovelha = functions.https.onRequest(app);