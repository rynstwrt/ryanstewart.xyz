// handle color sections at start
const paletteSection = document.getElementById("color-section");
const customColorSection = document.getElementById("custom-color-section");
enableDisableSection(customColorSection, false);

paletteSection.addEventListener("click", () =>
{
    enableDisableSection(customColorSection, false);
    enableDisableSection(paletteSection, true);
});

customColorSection.addEventListener("click", () =>
{
    enableDisableSection(paletteSection, false);
    enableDisableSection(customColorSection, true);
});


// on submit, assign colors from StreamVisualizer.js and attempt to get user media
const paletteSelection = document.getElementById("palettes");
const colorInput = document.getElementById("custom-color-input");
let colors;

document.getElementById("start-button").addEventListener("click", () =>
{
    const value = [paletteSelection, colorInput].filter(x => !x.parentElement.classList.contains("disabled-section"))[0].value.toLowerCase();

    switch(value)
    {
        case "ice pop":
            colors = ["#D7D9CE", "#E03616", "#119DA4", "#0C7489"];
            break;
        case "birch gunmetal":
            colors = ["#B4B8AB", "#153243", "#284B63", "#F4F9E9"];
            break;
        case "vu meter":
            colors = ["#06FD00", "#FDC542", "#FC1F23"];
            break;
        case "beige matte":
            colors = ["#463F3A", "#8A817C", "#BCB8B1", "#F4F3EE"];
            break;
        default:
            colors = [value];
            break;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(onMicAccess).catch(onMicDeny);
});


// handle canvas resizing
const canvas = document.getElementById("visualizer-canvas");
const canvasTransitionSeconds = .25;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.transition = `opacity ${canvasTransitionSeconds}s ease-in-out`;
window.addEventListener("resize", () =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// handle key down events
let readyToHandleKeyEvents = false;
document.addEventListener("keydown", event =>
{
    // cancel the keydown event
    event.preventDefault();

    // if the event is fired within a composition session (multiple keys)
    if (event.isComposing) return;

    // some browsers don't have .code, so use keyCode as fallback.
    const code = event.code || event.keyCode;

    // hide or show footer on enter key
    if (code === "Enter" || code === 13)
    {
        toggleFooter();
        return;
    }

    // change visualizer on left arrow key
    if (code === "ArrowLeft" || code === 74)
    {
        cycleVisualizer(false);
        return;
    }

    // change visualizer on right arrow key
    if (code === "ArrowRight" || code === 39)
    {
        cycleVisualizer(true);
        return;
    }

    // change color order on up arrow key
    if (code === "ArrowUp" || code === 38)
    {
        cycleColors(true);
        return;
    }


    // change color order on down arrow key
    if (code === "ArrowDown" || code === 40)
    {
        cycleColors(false);
        return;
    }
});


// handle touch events to detect swipes
let touchStartX;
let touchEndX;
const minDist = 200;
let readyToHandleTouchEvents = false;
function handleTouchEvent()
{
    if (!readyToHandleTouchEvents) return;

    const dist = Math.abs(touchEndX - touchStartX);

    if (dist === 0)
    {
        // tap: hide or show footer
        toggleFooter();
        return;
    }

    // return if swipe not big swipe (to prevent false detection)
    if (dist < minDist) return;

    // left swipe
    if (touchStartX > touchEndX)
    {
        cycleVisualizer(true);
        return;
    }

    // right swipe
    if (touchStartX < touchEndX)
    {
        cycleVisualizer(false);
        return;
    }
}

document.addEventListener("touchstart", event =>
{
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", event =>
{
    touchEndX = event.changedTouches[0].screenX;
    handleTouchEvent();
});



