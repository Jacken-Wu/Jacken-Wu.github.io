window.onload = function(){
    var snake = document.getElementById("snake");
    var author = document.getElementById("author")
    snake.onclick = function(){
        location.href = "./snake/snake.html";
    };
    author.onclick = function(){
        location.href = "https://github.com/Jacken-Wu/Jacken-Wu.github.io/tree/main/games";
    };
};
