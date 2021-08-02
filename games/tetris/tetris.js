window.onload = function(){
    var background = document.getElementById("background");
    for(var x=0; x<15; x++)  //生成格子
        for(var y=0; y<25; y++)
        {
            var block = document.createElement("div");
            block.id = x + " " + y;
            block.className = "block";
            block.style.left = 32*x + 5 + "px";
            block.style.top = 32*y + 5 + "px";
            background.appendChild(block);
        };
    function shapeL1(posX, posY){  //生成形状
        var poss = [[posX,posY], [posX-1,posY-1], [posX-1,posY], [posX+1,posY]];
        return poss;
    }
    function shapeL2(posX, posY){
        var poss = [[posX,posY], [posX-1,posY], [posX+1,posY], [posX+1,posY-1]];
        return poss;
    }
    function shapeSqure(posX, posY){
        var poss = [[posX,posY], [posX-1,posY-1], [posX,posY-1], [posX-1,posY]];
        return poss;
    }
    function shapeT(posX, posY){
        var poss = [[posX,posY], [posX,posY-1], [posX-1,posY], [posX+1,posY]];
        return poss;
    }
    function shapeI(posX, posY){
        var poss = [[posX,posY], [posX,posY-1], [posX,posY+1], [posX,posY+2]];
        return poss;
    }
    function shapeZ1(posX, posY){
        var poss = [[posX,posY], [posX-1,posY-1], [posX,posY-1], [posX+1,posY]];
        return poss;
    }
    function shapeZ2(posX, posY){
        var poss = [[posX,posY], [posX-1,posY], [posX,posY-1], [posX+1,posY-1]];
        return poss;
    }
    
    function rotateLeft(poss){  //旋转形状
        var x;
        var y;
        var poss_out = [poss[0]];
        for(var i=1; i<4; i++)
        {
            x = poss[i][0] - poss[0][0];
            y = poss[i][1] - poss[0][1];
            poss_out[i] = [poss[0][0]+y, poss[0][1]-x];
        };
        return poss_out;
    };
    function rotateRight(poss){
        var x;
        var y;
        var poss_out = [poss[0]];
        for(var i=1; i<4; i++)
        {
            x = poss[i][0] - poss[0][0];
            y = poss[i][1] - poss[0][1];
            poss_out[i] = [poss[0][0]-y, poss[0][1]+x];
        };
        return poss_out;
    };

    var left = document.getElementById("left");
    var down = document.getElementById("down");
    var right = document.getElementById("right");
    var leftMove = document.getElementById("leftMove");
    var rightMove = document.getElementById("rightMove");

    left.onclick = function(){
        posNow = rotateLeft(posNow);
    };
    right.onclick = function(){
        posNow = rotateRight(posNow);
    };
    
    var posNow = shapeL1(5, 4);
    var posPass = posNow;
    var timer = setInterval(function(){
        for(var i=0; i<4; i++)
        {
            var block = document.getElementById(posPass[i][0] + " " + posPass[i][1]);
            block.style.backgroundColor = "black";
        };

        var block = document.getElementById(posNow[0][0] + " " + posNow[0][1]);
        block.style.backgroundColor = "red";
        for(var i=1; i<4; i++)
        {
            var block = document.getElementById(posNow[i][0] + " " + posNow[i][1]);
            block.style.backgroundColor = "yellow";
        };
        posPass = [].concat(posNow);

        var pass = 25;  //超出部分
        for(var i=0; i<4; i++)  //下降
        {
            posNow[i] = [posNow[i][0], posNow[i][1]+1];
            if(24-posNow[i][1] < pass)
                pass = 24-posNow[i][1];
        };
        if(pass < 0)
            for(var i=0; i<4; i++)
                posNow[i] = [posNow[i][0], posNow[i][1]+pass];
        var isStop = true;
        for(var i=0; i<4; i++)
            if(posNow[i][0] != posPass[i][0] || posNow[i][1] != posPass[i][1])
                isStop = false;
        
    }, 100);
};