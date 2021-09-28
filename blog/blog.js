window.onload = function () {
    var maxPage = 7;  // 最大页数
    var nowPage = location.href.split("=")[1] ? parseInt(location.href.split("=")[1]) : 1;  // 当前页数

    // 博客内容
    var blog = new XMLHttpRequest();
    blog.open("Get", "./blogs/"+nowPage+".txt", false);
    blog.send(null);
    var text = blog.responseText.split("\n")
    var textinner = "<h1>"+text[0]+"</h1>";
    for (var i = 1; i < text.length; i++) {
        textinner += "<p>\t"+text[i]+"</p>";
    };
    document.getElementById("text").innerHTML = textinner;

    // 分页
    var lastPage = nowPage-1>1 ? nowPage-1 : 1;  // 上一页
    var nextPage = nowPage+1<maxPage ? nowPage+1 : maxPage;  // 下一页
    var pagesInner = "<div class='page' onclick='location.href=\"./blog.html?page="+lastPage+"\"'><</div>";
    var isNull = true;  // 是否可以添加省略号
    var width = 2;  // 记录分页栏的长度
    for (var pageNum = 1; pageNum <= maxPage; pageNum++) {
        if (pageNum <= 3 || pageNum >= nowPage-2 && pageNum <= nowPage+2 || pageNum >= maxPage-2) {
            if (pageNum == nowPage) {
                pagesInner += "<div id='now' class='page' onclick='location.href=\"./blog.html?page="+pageNum+"\"'>"+pageNum+"</div>";
            }else{
                pagesInner += "<div class='page' onclick='location.href=\"./blog.html?page="+pageNum+"\"'>"+pageNum+"</div>";
            };
            isNull = true;
            width++;
        }else{
            if (isNull) {
                pagesInner += "<div class='null'>...</div>";
                isNull = false;
                width++;
            };
        };
    };
    pagesInner += "<div class='page' onclick='location.href=\"./blog.html?page="+nextPage+"\"'>></div>";
    document.getElementById("pages").innerHTML = pagesInner;
    document.getElementById("pages").style.width = 30*width+"px";

    // 页数显示
    document.getElementById("pageNum").innerHTML = "第"+nowPage+"页";
}