// variables
const canvas = document.getElementById("visualizer-canvas");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
const audioElem = document.getElementById("visualizer-audio");
const wave = new Wave();


// set up play-pause button
const playPauseButton = document.getElementById("play-pause-button");
let isPlaying = false;
playPauseButton.addEventListener("click", () =>
{
    isPlaying ? fadeOut() : fadeIn();

    audioElem.volume = volumeSlider.value;

    const playPausePromise = isPlaying ? new Promise(resolve => { audioElem.pause(); resolve() }) : audioElem.play();
    playPausePromise.then(() =>
    {
        isPlaying = !isPlaying;

        playPauseButton.classList.remove(isPlaying ? "fa-play" : "fa-pause");
        playPauseButton.classList.add(isPlaying ? "fa-pause" : "fa-play");
    });
});


// set up volume slider
const volumeSlider = document.getElementById("volume-slider");
volumeSlider.addEventListener("input", () =>
{
    audioElem.volume = volumeSlider.value;
});


// handle resizing of canvas
window.addEventListener("resize", () =>
{
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
});


// set visualiser design
wave.fromElement(audioElem.id, canvas.id, { type: "web", colors: ["#C7EF00"] });


// fade in canvas
const transitionSeconds = 4;
function fadeIn()
{
    canvas.style.transition = `opacity ${transitionSeconds}s ease-in-out`;
    canvas.style.opacity = "1";
}

// fade out canvas
function fadeOut()
{
    canvas.style.transitionDuration = `${transitionSeconds / 20}s`;
    canvas.style.opacity = "0";
}