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
    cycleSong(Math.random() >= .5); // set the image, audio source, etc. 50% of increasing.
    wave.fromElement(audioElem.id, canvas.id, { type: "web", colors: ["#C7EF00"] });
    overlay.style.display = "none";
    if (sl.isTouchDevice()) sl.startListening();
});


// handle resizing of canvas
window.addEventListener("resize", () =>
{
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
});


// change controls if on touch device
const sl = new SwipeListener(document);
if (sl.isTouchDevice())
{
    document.getElementById("prev-song").textContent = "Left swipe";
    document.getElementById("next-song").textContent = "Right swipe";
}