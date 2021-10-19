window.onload = function () {
    var select = document.getElementById("sel-music");
    select.onclick = function () {
        music.click();
    };
    var musicAdd = document.getElementById("add-music");
    musicAdd.onclick = function () {
        musicAd.click();
    };

    var music = document.getElementById("up-music");
    var audio = document.getElementById("audio");
    var musicList = [];
    var musicLi = document.getElementById("music-li");
    var musicDel = document.getElementById("music-del");

    function optionWrite() {
        let options = "";
        for (let i = 0; i < musicList.length; i++) {
            options += "<option value='" + i + "'>" + musicList[i]["name"] + "</option>";
        };
        musicLi.innerHTML = options;
        musicDel.innerHTML = "<option value='-1'>-删除音乐-</option>" + options;
    };

    music.onchange = () => {
        musicList = []
        for (let i = 0; i < music.files.length; i++) {
            musicList.push(music.files[i]);
        };
        audio.src = URL.createObjectURL(musicList[0]);
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

    var musicNum = 0;
    var last = document.getElementById("last");
    var next = document.getElementById("next");
    last.onclick = () => {
        if (0 < musicNum && musicNum < musicList.length) {
            musicLi.value = --musicNum;
            audio.src = URL.createObjectURL(musicList[musicNum]);
        };
    };
    next.onclick = () => {
        if (0 <= musicNum && musicNum < musicList.length - 1) {
            musicLi.value = ++musicNum;
            audio.src = URL.createObjectURL(musicList[musicNum]);
        };
    };
    var mod = document.getElementById("music-mod");
    audio.onended = () => {  // 播放模式
        switch (mod.value) {
            case "0":
                next.click();
                break;
            case "1":
                if (musicLi.value < musicList.length - 1) {
                    next.click();
                } else {
                    musicLi.value = 0;
                    audio.src = URL.createObjectURL(musicList[0]);
                };
                break;
            case "2":
                musicLi.value = Math.floor(Math.random() * musicList.length);
                audio.src = URL.createObjectURL(musicList[musicLi.value]);
                break;
            case "3":
                audio.play();
        };
    };
    musicLi.onchange = () => {
        musicNum = musicLi.value;
        audio.src = URL.createObjectURL(musicList[musicLi.value]);
    };
    musicDel.onchange = () => {
        let musicDeleted = musicDel.value;
        let musicNow = musicLi.value;
        musicList.splice(musicDeleted, 1);
        optionWrite();
        musicLi.value = musicNow;
        if (musicNow == musicDeleted) {
            if (musicDeleted < musicList.length) {
                audio.src = URL.createObjectURL(musicList[musicNow]);
            } else if (musicDeleted > 0) {
                musicLi.value = --musicNow;
                audio.src = URL.createObjectURL(musicList[musicNow]);
            } else {
                musicLi.innerHTML = "<option value='-1'>-播放列表-</option>";
                audio.src = "";
            };
        } else if (musicNow > musicDeleted) {
            musicLi.value = --musicNow;
        };
    };
}