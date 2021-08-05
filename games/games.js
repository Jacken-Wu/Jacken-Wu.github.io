window.onload = function(){
    var back = document.getElementById("backButton");
    var snake = document.getElementById("snake");
    var author = document.getElementById("author");
    back.onclick = function(){
        location.href = "../index.html";
    };
    snake.onclick = function(){
        location.href = "./snake/snake.html";
    };
    author.onclick = function(){
        location.href = "https://github.com/Jacken-Wu/Jacken-Wu.github.io/tree/main/games";
    };
};
