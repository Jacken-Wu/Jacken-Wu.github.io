function searchWidth () {
    var searchBack = document.getElementById("search-back");
    var searchText = document.getElementById("search-text");
    searchText.style.width = searchBack.clientWidth-70+"px";
}