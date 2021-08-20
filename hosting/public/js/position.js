class Position{

    constructor(space,x, y,cX, cY, w, h, id,text){
        this.space = space;
        this.x = x;
        this.y = y;
        this.cX = cX;
        this.cY = cY;
        this.w = w;
        this.h = h;
        this.id = id;
        this.text = text;
        this.textPositionBoardcolor = "#E7E7E7";
        this.markColorWinner = "#FF0000";
        this.markColorX = "#000000";
        this.markColorCircle = "#194E92";
        clickableElements.push(this);
    }

    render(){
        this.writePosition();
    }

    writePosition(){
        let sizeText =  (30 * this.space)/100;
        let y = (this.cY + (sizeText / 2));
        context.font = sizeText+"px Comic Sans MS";
        context.fillStyle = this.textPositionBoardcolor;
        context.textAlign = "center";
        context.fillText(this.text, this.cX, y);
    }

    mark(type,isWiner){ 
        this.clear();
        console.log('mark '+type);
     
        if(type.toUpperCase() === "O"){
          let sizeMark =  (30 * this.space)/100;
          this.drawCircle(sizeMark,isWiner);
          console.log('mark entrou circle');

        }else{
            console.log('mark entrou x');
          let sizeMark =  (50 * this.space)/100;
          this.drawX((sizeMark / 2), isWiner);
        };
    }

      drawCircle(sizeMark,isWiner){
        let colorStyle = this.markColorCircle;
        
        if(isWiner){
          colorStyle = this.markColorWinner
        }
        context.beginPath();
        context.strokeStyle = colorStyle;
        context.arc(this.cX,this.cY, sizeMark,0,Math.PI*2);
        context.stroke(); 
      }
      
      drawX(halfSizeMark, isWiner){
        let colorStyle = this.markColorX;
        
        if(isWiner){
          colorStyle = this.markColorWinner
        }
        let xStart = this.cX - halfSizeMark;
        let xEnd = this.cX + halfSizeMark;
        let yTop = this.cY - halfSizeMark;
        let yDown = this.cY + halfSizeMark;
    
        context.strokeStyle = colorStyle;
        context.beginPath()
        context.moveTo(xStart, yDown);
        context.lineTo(xEnd, yTop );
        context.moveTo(xStart, yTop);
        context.lineTo(xEnd, yDown );
        context.stroke();
      }
    
    clear() {
        let x = this.cX - (this.w / 2);
        let y = this.cY - (this.h / 2);
        context.clearRect(x, y, this.w,this.h);
    }

    touchCallback(){
        if(typeof this.query != 'undefined'){
            sendQuery(this.query)
        }else{
            sendQuery(this.id)
        }
    }

}
