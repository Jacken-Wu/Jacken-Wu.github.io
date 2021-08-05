window.onload = function(){
    var map = document.getElementById("backGround");
    var eatting = [];
    var snake = [[15, 5], [15, 4], [15, 3]];
    var direction = 3;

    for(var row = 0; row < 20; row++)  //列数
        for(var col = 0; col < 20; col++)  //行数
        {
            var divBlock = document.createElement("div");
            divBlock.id = col + " " + row;
            divBlock.className = "block"
            divBlock.style.left = 32*row + 5 + "px";
            divBlock.style.top = 32*col + 5 + "px";
            map.appendChild(divBlock);
        };

    function random(l, h){
        return parseInt(Math.random()*(h-l) + l);
    };
    function addEatting(){
        while(true)
        {
            var x = random(0, 20);
            var y = random(0, 20);
            var flag = true;
            for(var i=0; i<eatting.length; i++)
                if(x == eatting[i][0] && y == eatting[i][1])
                    flag = false;
            for(var i=0; i<snake.length; i++)
                if(x == snake[i][0] && y == snake[i][1])
                    flag = false;
            if(flag)
            {
                eatting.push([x, y]);
                var eatPoint = document.getElementById(x + " " + y);
                eatPoint.style.background = "white";
                break;
            };
        };
    };

    var div;
    var direction2 = direction;
    for(var i=0; i<snake.length; i++)
    {
        div = document.getElementById(snake[i][0] + " " + snake[i][1]);
        div.style.background = "yellow";
    };

    var restart = document.getElementById("restart");  //restart按钮，重新初始化
    restart.onclick = function(){
        div = document.getElementsByClassName("block");
        for(var i=0; i<div.length; i++)
            div[i].style.background = "black";
        eatting = [];
        snake = [[15, 5], [15, 4], [15, 3]];
        direction = direction2 = 3;
        map.style.background = "royalblue";
        eatSelf = false
        for(var i=0; i<snake.length; i++)
        {
            div = document.getElementById(snake[i][0] + " " + snake[i][1]);
            div.style.background = "yellow";
        };
    };
    
    var eatSelf = false;
    setInterval(function(){
        direction = direction2;
        while(eatting.length < 3)
            addEatting();
        switch(direction)
        {
            case(1):
                snake.unshift([snake[0][0], snake[0][1]-1]);
                break;
            case(2):
                snake.unshift([snake[0][0]-1, snake[0][1]]);
                break;
            case(3):
                snake.unshift([snake[0][0], snake[0][1]+1]);
                break;
            case(4):
                snake.unshift([snake[0][0]+1, snake[0][1]]);
                break;
        };

        for(var i=1; i<snake.length; i++)
            if(snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1])
                eatSelf = true;
        if(snake[0][0] > 19 || snake[0][1] > 19 || snake[0][0] < 0 || snake[0][1] < 0 || eatSelf)
            map.style.background = "red";

        div = document.getElementById(snake[0][0] + " " + snake[0][1]);
        div.style.background = "yellow";
        
        var isEat = false;
        for(var i=0; i<eatting.length; i++)
            if(snake[0][0] == eatting[i][0] && snake[0][1] == eatting[i][1])
            {
                eatting.splice(i, 1);
                isEat = true;
            };
        if(!isEat)
        {
            var a = snake.pop();
            div = document.getElementById(a[0] + " " + a[1]);
            div.style.background = "black";
        };
        
        document.onkeydown = function(){
            event.preventDefault();
            if(!(snake[0][0] > 19 || snake[0][1] > 19 || snake[0][0] < 0 || snake[0][1] < 0 || eatSelf))
                switch(event.keyCode)
                {
                    case(37):
                        if(direction != 3)
                            direction2 = 1;
                        break;
                    case(38):
                        if(direction != 4)
                            direction2 = 2;
                        break;
                    case(39):
                        if(direction != 1)
                            direction2 = 3;
                        break;
                    case(40):
                        if(direction != 2)
                            direction2 = 4;
                        break;
                };
        };
    }, 500);
    
    var left = document.getElementById("left");
    var up = document.getElementById("up");
    var right = document.getElementById("right");
    var down = document.getElementById("down");
    left.onclick = function(){
        if(direction != 3)
            direction2 = 1;
    };
    up.onclick = function(){
        if(direction != 4)
            direction2 = 2;
    };
    right.onclick = function(){
        if(direction != 1)
            direction2 = 3;
    };
    down.onclick = function(){
        if(direction != 2)
            direction2 = 4;
    };
    
    var back = document.getElementById("backButton");
    back.onclick = function(){
        location.href = "../index.html";
    };
};