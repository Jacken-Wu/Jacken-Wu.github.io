window.onload = function () {
    searchWidth();

    var chr = new XMLHttpRequest();
    chr.open("Get", "./data/sim_tra.txt", false);
    chr.send(null);
    var chr_list = chr.responseText.split(",");

    var textBack = document.getElementById("text-back");
    var inner = "";
    function add(n) {
        var len = n + 10 < chr_list.length ? n + 10 : chr_list.length;
        for (n; n < len; n++) {
            inner += "<div class='text'><p>" + (n + 1) + ". " + chr_list[n] + "</p><img src='./data/" + chr_list[n][0] + ".png' alt='" + chr_list[n][0] + "'></div>";
        };
        textBack.innerHTML = inner;
    };

    var now_num = 0;
    add(now_num);
    now_num = 10;

    var more = document.getElementById("more");
    var isSearch = false;  // 记录是否是在搜索状态，控制"more"按钮的功能
    more.onclick = function () {
        if (!isSearch) {
            add(now_num);
            now_num += 10;
        } else {
            textBack.innerHTML = inner;
            more.innerText = "More";
            isSearch = false;
        }
    }

    function search(s) {
        var n;
        for (var i = 0; i < chr_list.length; i++) {
            if (chr_list[i][0] == s) {
                n = i;
                break;
            }
        }
        if (n) {
            textBack.innerHTML = "<div class='text'><p>" + (n + 1) + ". " + chr_list[n] + "</p><img src='" + chr_list[n][0] + ".jpg' alt='" + chr_list[n][0] + "'></div>";
        }else{
            textBack.innerHTML = "<div class='text'><p>Not Found</p></div>";
        };
        more.innerText = "Back";
        isSearch = true;
    };
    var searchButton = document.getElementById("search-start");
    var searchText = document.getElementById("search-text");
    searchButton.onclick = function () {
        search(searchText.value);
    };
    searchText.onkeydown = function () {
        if (event.keyCode == 13) {
            search(searchText.value);
        }
    }
}