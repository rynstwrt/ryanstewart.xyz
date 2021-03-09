// user variables
let colorIndex = 0;
const colorArrays = getColorPermutations(["#E03616", "#D7D9CE", "#0C7489", "#119DA4"]);
let designIndex = 8;
const designs = ["web", "bars", "bars blocks", "big bars", "cubes", "dualbars", "dualbars blocks", "fireworks", "flower", "flower blocks", "orbs", "ring", "rings", "round wave", "shine", "shine rings", "shockwave", "star", "static", "stitches", "wave"];


// handle canvas size and resizing.
const canvas = document.getElementById("visualizer-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// on microphone access
// start wave and hide overlay
const overlay = document.getElementById("overlay");
const wave = new Wave();
let stream;
function onMicAccess(micStream)
{
    stream = micStream;

    const design = {
        type: designs[designIndex],
        colors: colorArrays[colorIndex]
    }

    wave.fromStream(stream, canvas.id, design);
    wave.playStream();
    overlay.style.display = "none";
}


// on microphone deny
// display error saying to reload
function onMicDeny()
{
    const h2 = overlay.getElementsByTagName("h2")[0];
    h2.textContent = "You denied microphone access! Enable microphone access then reload the page!";
}


// wait for user interaction, then request microphone access.
overlay.addEventListener("click", () =>
{
    navigator.mediaDevices.getUserMedia({ audio: true }).then(onMicAccess).catch(onMicDeny);
});


// get permutation of colors from a given color array
function getColorPermutations(currentColors)
{
    const result = [];
    if (currentColors.length === 0 || currentColors.length === 1) return currentColors;

    for (let i = 0; i < currentColors.length; ++i)
    {
        const currentColor = currentColors[i];
        const remainingColors = currentColors.slice(0, i).concat(currentColors.slice(i + 1));

        const remainingColorsPermuted = getColorPermutations(remainingColors);

        for (let j = 0; j < remainingColorsPermuted.length; ++j)
        {
            const permutedArray = [currentColor].concat(remainingColorsPermuted[j]);
            result.push(permutedArray);
        }
    }

    return result;
}


const footer = document.getElementById("footer");
document.addEventListener("keydown", e =>
{
    // cancel the keydown event
    e.preventDefault();

    // if the event is fired within a composition session (multiple keys)
    if (e.isComposing) return;

    // some browsers don't have .code, so use keyCode as fallback.
    const code = e.code || e.keyCode;

    // hide or show footer on enter key
    if (code === "Enter" || code === 13)
    {
        const currentDisplay = footer.style.display;
        footer.style.display = (currentDisplay !== "none") ? "none" : "inherit";
        return;
    }

    // change visualizer on left arrow key
    if (code === "ArrowLeft" || code === 74)
    {
        designIndex = (designIndex === 0) ? designs.length - 1 : designIndex - 1;

        const design = {
            type: designs[designIndex],
            colors: colorArrays[colorIndex]
        }

        wave.fromStream(stream, canvas.id, design);
        return;
    }

    // change visualizer on right arrow key
    if (code === "ArrowRight" || code === 39)
    {
        designIndex = (designIndex === designs.length - 1) ? 0 : designIndex + 1;

        const design = {
            type: designs[designIndex],
            colors: colorArrays[colorIndex]
        }

        wave.fromStream(stream, canvas.id, design);
        return;
    }

    // change the order of the color palette (increase index by 1)
    if (code === "Space" || code === 32)
    {
        if (colorIndex === colorArrays.length - 1) colorIndex = -1;
        ++colorIndex;

        const design = {
            type: designs[designIndex],
            colors: colorArrays[colorIndex]
        }

        wave.fromStream(stream, canvas.id, design);
    }
});