// ==UserScript==
// @name         bilibili ban
// @namespace    https://space.bilibili.com/141083459
// @version      0.1
// @description  bilibili notice
// @author       -墓场-
// @match        https://www.bilibili.com/
// @icon         https://raw.githubusercontent.com/Jacken-Wu/hello-world/main/biliBackground/icon48.png
// @grant        none
// ==/UserScript==

var workblock = '<meta http-equiv="refresh" content="5;url=hello.html">';

setTimeout(function () {
    document.body.innerHTML += workblock;
}, 5000)