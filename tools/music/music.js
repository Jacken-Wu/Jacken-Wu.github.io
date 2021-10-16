window.onload = function () {
    var music = document.getElementById("up-music");
    var audio = document.getElementById("audio");
    music.onchange = function () {
        console.log(music.files);
        audio.src = URL.createObjectURL(music.files[0]);
    }
}