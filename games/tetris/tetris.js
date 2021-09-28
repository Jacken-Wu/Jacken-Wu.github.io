window.onload = function () {
    var background = document.getElementById("background");
    for (var j = 0; j < 10; j++)  // 10列
        for (var i = 0; i < 17; i++) {  // 16行 + 最底端不显示的1行
            var block = document.createElement("div");
            block.className = "block";
            block.id = i + " " + j;
            block.style.left = 30 * j + 5 + "px";
            block.style.top = 30 * i + 5 + "px";
            background.appendChild(block);
        };

    function createBlocks() {
        switch (Math.floor(Math.random() * 7)) {
            case 0:  // 方块
                return [[0, 4], [0, 5], [1, 4], [1, 5], "O"];
            case 1:  // I
                return [[1, 3], [1, 4], [1, 5], [1, 6], "I"];
            case 2:  // L
                return [[0, 6], [1, 4], [1, 5], [1, 6], "L"];
            case 3:  // 反L
                return [[0, 4], [1, 4], [1, 5], [1, 6], "-L"];
            case 4:  // T
                return [[0, 5], [1, 4], [1, 5], [1, 6], "T"];
            case 5:  // Z
                return [[0, 4], [0, 5], [1, 5], [1, 6], "Z"];
            case 6:  // 反Z
                return [[0, 5], [0, 6], [1, 4], [1, 5], "-Z"];
        };
    };
    var blocksDown = createBlocks();  // 正在下落的方块
    var blocks = [];  // 已经落下的方块
    for (var i = 0; i < 10; i++)  // 最底端的边界
        blocks[i] = [16, i];
    var down = document.getElementById("down");
    var turn = document.getElementById("turn");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var downFaster = document.getElementById("downFaster");
    function isIn(a, b) {  // 判断坐标a是否在数组b中
        for (var i = 0; i < b.length; i++) {
            if (a[0] == b[i][0] && a[1] == b[i][1])
                return true;
        };
        return false;
    };
    function isBorder(a) {
        if (a[0] < 0 || a[0] > 15 || a[1] < 0 || a[1] > 9)
            return true;
        return false;
    };
    function downDown() {
        var isInFlag = false;
        while (!isInFlag) {
            for (var i = 0; i < 4; i++) {
                var next = [blocksDown[i][0] + 1, blocksDown[i][1]];
                if (isIn(next, blocks))
                    isInFlag = true;
            };
            if (!isInFlag)
                for (var i = 0; i < 4; i++)
                    blocksDown[i] = [blocksDown[i][0] + 1, blocksDown[i][1]];
        };
    };
    function caseMod(axisNum, nextShape, nextName) {
        var axis = blocksDown[axisNum];
        var i = axis[0];
        var j = axis[1];
        var blocksNext = [[i + nextShape[0], j + nextShape[1]], [i + nextShape[2], j + nextShape[3]], [i + nextShape[4], j + nextShape[5]], [i + nextShape[6], j + nextShape[7]]];
        var isProper = true;
        for (var i = 0; i < 4; i++)
            if (isIn(blocksNext[i], blocks) || isBorder(blocksNext[i]))
                isProper = false;
        if (isProper) {
            blocksNext.push(nextName);
            blocksDown = blocksNext;
        };
    };
    function turnDown() {
        switch (blocksDown[4]) {
            case "O":
                break;
            case "I":
                caseMod(1, [-1, 0, 0, 0, 1, 0, 2, 0], "I1");
                break;
            case "I1":
                caseMod(1, [0, -1, 0, 0, 0, 1, 0, 2], "I");
                break;
            case "L":
                caseMod(2, [-1, -1, -1, 0, 0, 0, 1, 0], "L1");
                break;
            case "L1":
                caseMod(2, [0, -1, 0, 0, 0, 1, 1, -1], "L2");
                break;
            case "L2":
                caseMod(1, [-1, 0, 0, 0, 1, 0, 1, 1], "L3");
                break;
            case "L3":
                caseMod(1, [-1, 1, 0, -1, 0, 0, 0, 1], "L");
                break;
            case "-L":
                caseMod(2, [-1, 0, 0, 0, 1, -1, 1, 0], "-L1");
                break;
            case "-L1":
                caseMod(1, [0, -1, 0, 0, 0, 1, 1, 1], "-L2");
                break;
            case "-L2":
                caseMod(1, [-1, 0, -1, 1, 0, 0, 1, 0], "-L3");
                break;
            case "-L3":
                caseMod(2, [-1, -1, 0, -1, 0, 0, 0, 1], "-L");
                break;
            case "T":
                caseMod(2, [-1, 0, 0, -1, 0, 0, 1, 0], "T1");
                break;
            case "T1":
                caseMod(2, [0, -1, 0, 0, 0, 1, 1, 0], "T2");
                break;
            case "T2":
                caseMod(1, [-1, 0, 0, 0, 0, 1, 1, 0], "T3");
                break;
            case "T3":
                caseMod(1, [-1, 0, 0, -1, 0, 0, 0, 1], "T");
                break;
            case "Z":
                caseMod(2, [-1, 1, 0, 0, 0, 1, 1, 0], "Z1");
                break;
            case "Z1":
                caseMod(1, [-1, -1, -1, 0, 0, 0, 0, 1], "Z");
                break;
            case "-Z":
                caseMod(3, [-1, -1, 0, -1, 0, 0, 1, 0], "-Z1");
                break;
            case "-Z1":
                caseMod(2, [-1, 0, -1, 1, 0, -1, 0, 0], "-Z");
        };
    };
    function leftDown() {
        var isProper = false;
        var next;
        for (var i = 0; i < 4; i++) {
            next = [blocksDown[i][0], blocksDown[i][1] - 1];
            if (isIn(next, blocks) || isBorder(next))
                isProper = true;
        };
        if (!isProper)
            for (var i = 0; i < 4; i++) {
                var block = document.getElementById(blocksDown[i][0] + " " + blocksDown[i][1]);
                block.style.backgroundColor = "black";
                blocksDown[i][1]--;
            };
    };
    function rightDown() {
        var isProper = false;
        var next;
        for (var i = 0; i < 4; i++) {
            next = [blocksDown[i][0], blocksDown[i][1] + 1];
            if (isIn(next, blocks) || isBorder(next))
                isProper = true;
        };
        if (!isProper)
            for (var i = 0; i < 4; i++) {
                var block = document.getElementById(blocksDown[i][0] + " " + blocksDown[i][1]);
                block.style.backgroundColor = "black";
                blocksDown[i][1]++;
            };
    };

    down.onmousedown = function () {
        downDown();
    };
    turn.onmousedown = function () {
        turnDown();
    };
    left.onmousedown = function () {
        leftDown();
    };
    right.onmousedown = function () {
        rightDown();
    };
    downFaster.onmousedown = function () {
        count = 11;
        mouseDown = setInterval(function () {
            count = 11;
        }, 100);
    };
    downFaster.onmouseup = function () {
        clearTimeout(mouseDown);
    };
    document.onkeydown = function () {
        event.preventDefault();
        switch (event.keyCode) {
            case 32:
                downDown();
                break;
            case 37:
                leftDown();
                break;
            case 38:
                turnDown();
                break;
            case 39:
                rightDown();
                break;
            case 40:
                count = 11;
        };
    };

    var score = document.getElementById("score");

    var timer;
    var count;
    var scoreNum;
    function startClick() {
        var blocksLast = blocksDown.concat();  // 上一帧的方块，用于刷新
        count = 0;
        scoreNum = 0;
        score.innerText = "score: " + scoreNum;
        timer = setInterval(function () {
            count++;
            for (var i = 0; i < 4; i++) {
                var blockId = blocksLast[i][0] + " " + blocksLast[i][1];
                var block = document.getElementById(blockId);
                block.style.backgroundColor = "black";
            };
            if (count > 10) {
                count = 0;
                var isInFlag = false;
                for (var i = 0; i < 4; i++) {
                    var next = [blocksDown[i][0] + 1, blocksDown[i][1]];
                    if (isIn(next, blocks))
                        isInFlag = true;
                };
                if (isInFlag) {
                    blocksDown.pop();
                    blocks = blocks.concat(blocksDown);
                    for (var i = 0; i < 4; i++) {
                        var blockId = blocksDown[i][0] + " " + blocksDown[i][1];
                        var block = document.getElementById(blockId);
                        block.style.backgroundColor = "rgb(190, 190, 190)";
                    };
                    blocksDown = createBlocks();
                } else
                    for (var i = 0; i < 4; i++)
                        blocksDown[i] = [blocksDown[i][0] + 1, blocksDown[i][1]];
            };
            for (var i = 0; i < 16; i++) {  // 消除
                var isWipeOut = true;
                for (var j = 0; j < 10; j++)
                    if (!isIn([i, j], blocks))
                        isWipeOut = false;
                if (isWipeOut) {
                    scoreNum++;
                    score.innerText = "score: " + scoreNum;
                    var blocks2 = [];
                    for (var i2 = 0; i2 < blocks.length; i2++)
                        if (blocks[i2][0] == i) {
                            var block = document.getElementById(blocks[i2][0] + " " + blocks[i2][1]);
                            block.style.backgroundColor = "black";
                        } else
                            blocks2.push(blocks[i2]);
                    blocks = [];
                    for (var i2 = 0; i2 < blocks2.length; i2++) {
                        if (blocks2[i2][0] > i) {
                            var block = document.getElementById(blocks2[i2][0] + " " + blocks2[i2][1]);
                            block.style.backgroundColor = "black";
                            blocks.push(blocks2[i2]);
                        } else {
                            var block = document.getElementById(blocks2[i2][0] + " " + blocks2[i2][1]);
                            block.style.backgroundColor = "black";
                            blocks.push([blocks2[i2][0] + 1, blocks2[i2][1]]);
                        };
                    };
                    for (var i2 = 0; i2 < blocks.length; i2++) {
                        var block = document.getElementById(blocks[i2][0] + " " + blocks[i2][1]);
                        block.style.backgroundColor = "rgb(190, 190, 190)";
                    };
                };
            };

            for (var i = 0; i < 4; i++)
                if (isIn(blocksDown[i], blocks)) {
                    background.style.backgroundColor = "red";
                    clearTimeout(timer);
                };

            blocksLast = blocksDown.concat();
            for (var i = 0; i < 4; i++) {
                var blockId = blocksDown[i][0] + " " + blocksDown[i][1];
                var block = document.getElementById(blockId);
                block.style.backgroundColor = "yellow";
            };
        }, 100);
    };
    function restartClick() {
        background.style.backgroundColor = "blue";
        for (var j = 0; j < 10; j++)  // 10列
            for (var i = 0; i < 17; i++) {  // 16行 + 最底端不显示的1行
                var block = document.getElementById(i + " " + j);
                block.style.backgroundColor = "black";
            };
        blocksDown = createBlocks();  // 正在下落的方块
        blocks = [];  // 已经落下的方块
        for (var i = 0; i < 10; i++)  // 最底端的边界
            blocks[i] = [16, i];
        startClick();
    };
    var restart = document.getElementById("restart");
    restart.onclick = function () {
        clearTimeout(timer);
        restartClick();
    };
    startClick();
};