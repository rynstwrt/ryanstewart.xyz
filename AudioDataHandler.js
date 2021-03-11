const audioElement = document.getElementById("visualizer-audio");
const albumArt = document.getElementById("album-art");
const textElement = document.getElementById("artist-and-title");

const songs = [
    {
        art: "images/MandaMoor.jpg",
        title: "Mama Chula (Manda Moor Edit)",
        artist: "Sirus Hood, Manda Moor",
        src: "audio/MamaChula.mp3"
    },
    {
        art: "images/DVS1.jpg",
        title: "Coding",
        artist: "DVS1",
        src: "audio/Coding.mp3"
    }
];


// at start, pick a random song and set its data
let songIndex = Math.floor(Math.random() * songs.length);

// function for cycling the playing song
function cycleSong(isIncreasing)
{
    if (isIncreasing)
        songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
    else
        songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1;

    const songData = songs[songIndex];
    albumArt.src = songData.art;
    textElement.textContent = `${songData.artist} - ${songData.title}`;
    audioElement.src = songData.src;

    audioElement.play();
}


// handle arrow keys
document.addEventListener("keydown", event =>
{
    event.preventDefault();
    if (event.isComposing) return;

    // some browsers don't have .code, so use keyCode as fallback.
    const code = event.code || event.keyCode;

    if (code === "ArrowLeft" || code === 74)
    {
        cycleSong(false);
        return;
    }

    if (code === "ArrowRight" || code === 39)
    {
        cycleSong(true);
        return;
    }
});


// handle audio ending
audioElement.onended = () =>
{
    cycleSong(true);
}
