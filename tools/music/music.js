window.onload = function () {
    var select = document.getElementById("sel-music");
    select.onclick = function () {  // 选择音乐
        music.click();
    };
    var musicAdd = document.getElementById("add-music");
    musicAdd.onclick = function () {  // 添加音乐
        musicAd.click();
    };

    var music = document.getElementById("up-music");
    var audio = document.getElementById("audio");
    var musicList = [];
    var musicLi = document.getElementById("music-li");
    var musicDel = document.getElementById("music-del");
    var title = document.getElementsByTagName("title")[0];

    function optionWrite() {  // 更新select的option
        let options = "";
        for (let i = 0; i < musicList.length; i++) {
            options += "<option value='" + i + "'>" + musicList[i]["name"] + "</option>";
        };
        musicLi.innerHTML = options;
        musicDel.innerHTML = "<option value='-1'>-删除音乐-</option>" + options;
    };

    var processBar = document.getElementById("process-bar-back");
    var processBarBody = document.getElementById("process-bar-body");
    var processBarHead = document.getElementById("process-bar-head");
    var processLen = processBar.offsetWidth;
    function musicUpdate (musicObject) {  // 播放音乐，同时更改页面标题，更新进度条
        title.innerText = musicObject['name'];
        audio.src = URL.createObjectURL(musicObject);
        processBarBody.style.transitionDuration = "0s";
        processBarHead.style.transitionDuration = "0s";
        processBarBody.style.width = "0";
        processBarHead.style.left = "-5px";
        setTimeout(function () {
            processBarBody.style.transitionDuration = audio.duration + "s";
            processBarHead.style.transitionDuration = audio.duration + "s";
            processBarBody.style.width = "100%";
            processBarHead.style.left = processLen - 5 + "px";
        }, 100);
    };
    
    processBar.onclick = function () {  // 拖动进度条
        let left = event.clientX - processBar.offsetLeft - processBar.offsetParent.offsetLeft
        let rate = left / processLen;
        let time = rate * audio.duration;
        audio.currentTime = time;
        processBarBody.style.transitionDuration = "0s";
        processBarHead.style.transitionDuration = "0s";
        processBarBody.style.width = rate * 100 + "%";
        processBarHead.style.left = left - 5 + "px";
        setTimeout(function () {
            if (!audio.paused) {
                processBarBody.style.transitionDuration = audio.duration - time + "s";
                processBarHead.style.transitionDuration = audio.duration - time + "s";
                processBarBody.style.width = "100%";
                processBarHead.style.left = processLen - 5 + "px";
            };
        }, 100);
    };

    var playPause = document.getElementById("play-pause");
    var style = document.getElementById("play-button");
    playPause.onclick = () => {
        if (audio.currentTime == audio.duration && audio.paused) {
            musicUpdate(musicList[musicLi.value]);
            style.innerText = ".process-frame:hover #play-pause{background: url(./pause.gif) center center;}"
        } else if (audio.paused) {
            audio.play();
            let leftTime = audio.duration - audio.currentTime;  // 剩余的时间
            processBarBody.style.transitionDuration = leftTime + "s";
            processBarHead.style.transitionDuration = leftTime + "s";
            processBarBody.style.width = "100%";
            processBarHead.style.left = processLen - 5 + "px";
            style.innerText = ".process-frame:hover #play-pause{background: url(./pause.gif) center center;}"
        } else {
            audio.pause();
            let rate = audio.currentTime / audio.duration;  // 当前播放进度
            processBarBody.style.transitionDuration = "0s";
            processBarHead.style.transitionDuration = "0s";
            processBarBody.style.width = rate * 100 + "%";
            processBarHead.style.left = processLen * rate - 5 + "px";
            style.innerText = ".process-frame:hover #play-pause{background: url(./play.gif) center center;}"
        };
    };

    music.onchange = () => {
        musicList = []
        for (let i = 0; i < music.files.length; i++) {
            musicList.push(music.files[i]);
        };
        musicUpdate(musicList[0]);
        audio.volume = 0.1;
        optionWrite();
    };
    var musicAd = document.getElementById("ad-music");
    musicAd.onchange = () => {
        if (musicList.length == 0) {
            musicAd.files = null;
        } else {
            let lastListLen = musicList.length;
            for (let i = 0; i < musicAd.files.length; i++) {
                musicList.push(musicAd.files[i]);
            };
            let options = "";
            for (let i = lastListLen; i < musicList.length; i++) {
                console.log(i, musicAd.files.length, musicList);
                options += "<option value='" + i + "'>" + musicList[i]["name"] + "</option>";
            };
            musicLi.innerHTML += options;
            musicDel.innerHTML += options;
        };
    };

    var last = document.getElementById("last");
    var next = document.getElementById("next");
    var mod = document.getElementById("music-mod");
    last.onclick = () => {
        if (0 < musicLi.value && musicLi.value < musicList.length) {
            --musicLi.value;
            musicUpdate(musicList[musicLi.value]);
        };
    };
    function nextNear () {
        if (0 <= musicLi.value && musicLi.value < musicList.length - 1) {
            ++musicLi.value;
            musicUpdate(musicList[musicLi.value]);
        };
    };
    next.onclick = () => {
        switch (mod.value) {
            case "0":
                nextNear();
                break;
            case "2":
                musicLi.value = Math.floor(Math.random() * musicList.length);
                musicUpdate(musicList[musicLi.value]);
                break;
            default:
                if (musicLi.value < musicList.length - 1) {
                    nextNear();
                } else {
                    musicLi.value = 0;
                    musicUpdate(musicList[0]);
                };
        };
    }
    audio.onended = () => {  // 播放模式
        switch (mod.value) {
            case "0":
                nextNear();
                break;
            case "1":
                if (musicLi.value < musicList.length - 1) {
                    nextNear();
                } else {
                    musicLi.value = 0;
                    musicUpdate(musicList[0]);
                };
                break;
            case "2":
                musicLi.value = Math.floor(Math.random() * musicList.length);
                musicUpdate(musicList[musicLi.value]);
                break;
            case "3":
                musicUpdate(musicList[musicLi.value]);
                break;
            case "4":
                style.innerText = ".process-frame:hover #play-pause{background: url(./play.gif) center center;}"
        };
    };
    musicLi.onchange = () => {
        musicUpdate(musicList[musicLi.value]);
    };
    musicDel.onchange = () => {
        let musicDeleted = musicDel.value;
        let musicNow = musicLi.value;
        musicList.splice(musicDeleted, 1);
        optionWrite();
        musicLi.value = musicNow;
        if (musicNow == musicDeleted) {
            if (musicDeleted < musicList.length) {
                musicUpdate(musicList[musicNow]);
            } else if (musicDeleted > 0) {
                musicLi.value = --musicNow;
                musicUpdate(musicList[musicNow]);
            } else {
                musicLi.innerHTML = "<option value='-1'>-播放列表-</option>";
                audio.src = "";
            };
        } else if (musicNow > musicDeleted) {
            musicLi.value = --musicNow;
        };
    };
}