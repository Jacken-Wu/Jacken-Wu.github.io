window.onload = function(){
    buttonsTop();

    var blog = new XMLHttpRequest();
    blog.open("Get", "./blog/blogs/8.txt", false);
    blog.send(null);
    var text = blog.responseText.split("\n");
    var textinner = "<h2>"+text[0]+"</h2>";
    for (var i = 1; i < text.length; i++) {
        textinner += "<p>\t"+text[i]+"</p>";
    };
    document.getElementById("lastBlog").innerHTML = textinner;
}