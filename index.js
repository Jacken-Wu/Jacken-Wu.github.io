window.onload = function(){
    var blogs = document.getElementById("blogs");
    var github = document.getElementById("github");

    var blog = new XMLHttpRequest();
    blog.open("Get", "./blog/blogs/7.txt", false);
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