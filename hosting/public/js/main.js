'use strict';
var action = null;
var view = document.getElementById('view');
let context = null; 
let canvasWidth =  view.clientWidth;
let canvasWidthCenter = canvasWidth / 2;
let canvasHeight = view.clientHeight;
let canvasHeightCenter = canvasHeight / 2;

let markColorX = "#363636";
let markColorCircle = "#FF0000";

var canvasArea = {
    canvas : document.createElement("canvas"),
    create : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        context = this.canvas.getContext("2d");
        view.appendChild(this.canvas);
        this.frameNo = 0;
    }
}

canvasArea.canvas.addEventListener("touchstart", touchHandler, false)


function startGame() {
canvasArea.create();
const menu = new Menu(context);
const panel = new Panel(context);
const board = new Board(panel.panelHeight);
action = new Action(menu,panel,board); 
action.setCallbacks();
}