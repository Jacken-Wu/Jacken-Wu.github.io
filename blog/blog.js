window.onload = function(){
    var blogListLenght = 3;  // txt文件的个数
    var pages = document.getElementById("pages");
    pages.style.width = 30*(blogListLenght+2) + "px";

    var blogButton = document.createElement("button");  // 向左翻页
    blogButton.className = "page";
    blogButton.id = "left";
    blogButton.innerText = "<";
    pages.appendChild(blogButton);

    for(var i=1; i<=blogListLenght; i++)
    {
        var blogButton = document.createElement("button");
        blogButton.className = "page";
        blogButton.id = i.toString();
        blogButton.innerText = i.toString();
        pages.appendChild(blogButton);
    };

    var blogButton = document.createElement("button");  // 向右翻页
    blogButton.className = "page";
    blogButton.id = "right";
    blogButton.innerText = ">";
    pages.appendChild(blogButton);

    var pageNow = 1;
    var blog = new XMLHttpRequest();
    blog.open("Get", "./blogs/"+pageNow+".txt", false);
    blog.send(null);
    var text = blog.responseText.split("\n");

    var backgroud = document.getElementById("text")
    var blogTittle = document.createElement("h1");
    blogTittle.innerText = text[0];
    backgroud.appendChild(blogTittle);
    for(var i=1; i<text.length; i++)
    {
        var blogText = document.createElement("p");
        blogText.innerText = "\t"+text[i];
        backgroud.appendChild(blogText);
    };

    buttons = document.getElementsByTagName("button");
    var buttonDown = function(page){
        pageNow = parseInt(page);
        var blogTexts = document.getElementById("text").getElementsByTagName("p");
        for(var j=blogTexts.length-1; j>=0; j--)
            backgroud.removeChild(blogTexts[j]);
        
        var blog = new XMLHttpRequest();
        blog.open("Get", "./blogs/"+page+".txt", false);
        blog.send(null);
        var text = blog.responseText.split("\n");
        blogTittle.innerText = text[0];
        for(var i=1; i<text.length; i++)
        {
            var blogText = document.createElement("p");
            blogText.innerText = "\t"+text[i];
            backgroud.appendChild(blogText);
        };
    };
    for(var i=1; i<blogListLenght+1; i++)  // 每一页的按钮
        buttons[i].onclick = function(){
            buttonDown(this.id);
        };
    buttons[0].onclick = function(){  // 向左翻页
        if(pageNow > 1)
            buttonDown(pageNow-1);
    };
    buttons[buttons.length-1].onclick = function(){  // 向右翻页
        if(pageNow < blogListLenght)
            buttonDown(pageNow+1);
    };
};