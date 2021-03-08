const audioElement = document.getElementById("visualizer-audio");
const albumArt = document.getElementById("album-art");
const textElement = document.getElementById("artist-and-title");

const songs = [
    {
        art: "Assets/Images/MandaMoor.jpg",
        title: "Mama Chula (Manda Moor Edit)",
        artist: "Sirus Hood, Manda Moor",
        src: "Assets/Audio/MamaChula.mp3"
    }
];

// at start, pick a random song and set its data
const songData = songs[Math.floor(Math.random() * songs.length)];
albumArt.src = songData.art;
textElement.textContent = `${songData.artist} - ${songData.title}`;
audioElement.src = songData.src;