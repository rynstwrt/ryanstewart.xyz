// user variables
let designIndex = 4;
const designs = ["web", "bars", "bars blocks", "big bars", "cubes", "dualbars", "dualbars blocks", "fireworks", "flower", "flower blocks", "orbs", "ring", "rings", "round wave", "shine", "shine rings", "shockwave", "star", "static", "stitches", "wave"];
let isTransitioning = false;


// on microphone access
// start wave and hide overlay
const overlay = document.getElementById("overlay");
const wave = new Wave();
let stream;
function onMicAccess(micStream)
{
    // set stream and visualize audio
    stream = micStream;
    wave.fromStream(stream, canvas.id, { type: designs[designIndex], colors: colors });
    wave.playStream();


    // hide the overlay to reveal the visualizer
    overlay.style.transition = `opacity ${canvasTransitionSeconds}s ease-in-out`;
    overlay.style.opacity = "0";

    // if using touch device, update the controls in the footer
    if (isTouchDevice())
    {
        document.getElementById("code-left").textContent = "Swipe left";
        document.getElementById("code-right").textContent = "Swipe right";
        document.getElementById("code-enter").textContent = "Tap";
        document.getElementById("code-up").textContent = "Swipe up";
        document.getElementById("code-down").textContent = "Swipe down";

        // let EventHandling.js know when can listen for swipe/tap events.
        setTimeout(() =>
        {
            readyToHandleTouchEvents = true;
            overlay.style.display = "none";
        }, canvasTransitionSeconds * 1000);
    }
    else
    {
        setTimeout(() =>
        {
            readyToHandleKeyEvents = true;
            overlay.style.display = "none";
        }, canvasTransitionSeconds * 1000);
    }
}


// on microphone deny
// display error saying to reload
function onMicDeny()
{
    const h2 = overlay.getElementsByTagName("h2")[0];
    h2.textContent = "You denied microphone access! Enable microphone access then reload the page!";
}


// toggle footer on enter press
const footer = document.getElementById("footer");
function toggleFooter()
{
    footer.style.display = (footer.style.display !== "none") ? "none" : "inherit";
}


// change the visualizer
function cycleVisualizer(isIncreasing)
{
    if (isTransitioning) return;
    isTransitioning = true;

    if (isIncreasing)
        designIndex = (designIndex === designs.length - 1) ? 0 : designIndex + 1;
    else
        designIndex = (designIndex === 0) ? designs.length - 1 : designIndex - 1;

    canvas.style.opacity = "0";

    setTimeout(() =>
    {
        wave.fromStream(stream, canvas.id, { type: designs[designIndex], colors: colors });
        canvas.style.opacity = "1";
        setTimeout(() =>
        {
            isTransitioning = false;
        }, canvasTransitionSeconds * 1000);
    }, canvasTransitionSeconds * 1000);
}


// check if the device is a touch device
function isTouchDevice()
{
    const hasEvent = "ontouchstart" in window;
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const msHasTouchPoints = navigator.msMaxTouchPoints > 0;
    return hasEvent || hasTouchPoints || msHasTouchPoints;
}


// "disable" the given div. For the color palette/picker sections.
function enableDisableSection(elem, enabling)
{
    enabling ? elem.classList.remove("disabled-section") : elem.classList.add("disabled-section");
}


// change the color order
function cycleColors(increasing)
{
    const newColors = [];

    if (increasing)
    {
        // move each color up an index
        for (let i = 0; i < colors.length; ++i)
        {
            const currentIndex = (i + 1) % colors.length;
            newColors[currentIndex] = colors[i];
        }
    }
    else
    {
        // move each color down an index
        for (let i = colors.length - 1; i >= 0; --i)
        {
            const currentIndex = i - 1 < 0 ? colors.length - 1 : i - 1;
            newColors[currentIndex] = colors[i];
        }
    }

    colors = newColors;
    wave.fromStream(stream, canvas.id, { type: designs[designIndex], colors: colors });
}