class Button {
    constructor(x, y, w, h, id, text,color,subtitle, query){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.text = text;
        this.query = query;
        this.textX = x + (w/2);
        this.fontSize = (40 * (h/2))/100;
        this.textY = (y + (h/2)) + (this.fontSize / 2);
        this.textColor = color;
        this.subtitleFontSize = (30 * (h/2))/100;
        this.subtitleY = (y + h) - (this.subtitleFontSize);
        this.subtitle = subtitle;
        this.subtitleColor = '#B22222';
        this.strokeStyleColor = '#979797';
        // canvasArea.canvas.addEventListener("touchstart", touchHandler, false)
        clickableElements.push(this);
    }

    render(){
        context.strokeStyle='#000';
        context.strokeRect(this.x, this.y, this.w, this.h);
    }

    roundedRect(radius){
        let x = this.x
        let y = this.y
        let height = this.h
        let width = this.w
        context.strokeStyle= this.strokeStyleColor;
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(x,y+radius);
        context.lineTo(x,y+height-radius);
        context.quadraticCurveTo(x,y+height,x+radius,y+height);
        context.lineTo(x+width-radius,y+height);
        context.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
        context.lineTo(x+width,y+radius);
        context.quadraticCurveTo(x+width,y,x+width-radius,y);
        context.lineTo(x+radius,y);
        context.quadraticCurveTo(x,y,x,y+radius);
        context.stroke();
        this.radius = radius;

        if(this.subtitle){
            new Text(this.textX,this.textY,this.fontSize,this.text, this.textColor).write()
            new Text(this.textX,this.subtitleY,this.subtitleFontSize,this.subtitle, this.subtitleColor).write()
        }else{
            new Text(this.textX,this.textY,this.fontSize,this.text, this.textColor).write()
        }

      }
    
    async touchCallback(){
        let colorChange = "#F4A460"
        let currentStrokeColor = this.strokeStyleColor;
        let currentTextColor = this.textColor;
        this.strokeStyleColor = colorChange;
        this.textColor = colorChange;
        this.roundedRect(this.radius)
        await sleep(300);
        this.strokeStyleColor = currentStrokeColor;
        this.textColor = currentTextColor;
        this.roundedRect(this.radius)
        
        if(typeof this.query != 'undefined'){
            sendQuery(this.query)
        }else{
            sendQuery(this.id)
        }
    }
    
}

 function  touchHandler(event){
    var rectNav = canvasArea.canvas.getBoundingClientRect();
    var pos = {
                x: event.touches[0].pageX - rectNav.left,
                y: event.touches[0].pageY - rectNav.top
            };

    clickableElements.forEach(function (element) {
        var clicked = onTarget(pos, element);
        if (clicked) element.touchCallback();
    })

}

function onTarget(pos, bt) {
    return pos.x > bt.x && pos.x < (bt.x + bt.w) && pos.y > bt.y && pos.y < (bt.y + bt.h);
  }

var clickableElements = [];

class Text{

    constructor(x,y,size,text,color){
        this.x = x
        this.y = y
        this.size = size
        this.text = text
        this.fontType = "Comic Sans MS";
        if(color){
            this.fontColor = color;
        }else{
            this.fontColor = "#979797";
        }
    }

    write(){  
        context.font = this.size+"pt "+  this.fontType;
        context.fillStyle = this.fontColor;
        context.textAlign = "center";
        context.fillText(this.text, this.x, this.y);
    }
}

//Util
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendQuery(query){
    console.log('sendQuery', query);
    interactiveCanvas.sendTextQuery(query);
}


 