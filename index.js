window.onload = function(){
    var games = document.getElementById("games");
    var blogs = document.getElementById("blogs");
    var github = document.getElementById("github");
    games.onclick = function(){
        location.href = "./games/index.html";
    };
    blogs.onclick = function(){
        location.href = "./blog/index.html";
    };
    github.onclick = function(){
        location.href = "https://github.com/Jacken-Wu/Jacken-Wu.github.io";
    };

    var blog = new XMLHttpRequest();
    blog.open("Get", "./blog/blogs/6.txt", false);
    blog.send(null);
    var text = blog.responseText.split("\n");

    var backgroud = document.getElementById("lastBlog")
    var blogTittle = document.createElement("h2");
    blogTittle.innerText = text[0];
    backgroud.appendChild(blogTittle);
    for(var i=1; i<text.length; i++)
    {
        var blogText = document.createElement("p");
        blogText.innerText = "\t"+text[i];
        backgroud.appendChild(blogText);
    };
}