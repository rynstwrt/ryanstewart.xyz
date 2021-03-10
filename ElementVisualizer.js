// variables
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("visualizer-canvas");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
const audioElem = document.getElementById("visualizer-audio");
const wave = new Wave();

// handle overlay click
overlay.addEventListener("click", () =>
{
    audioElem.volume = .25;
    audioElem.play();
    wave.fromElement(audioElem.id, canvas.id, { type: "web", colors: ["#C7EF00"] });
    overlay.style.display = "none";
});


// handle resizing of canvas
window.addEventListener("resize", () =>
{
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
});
