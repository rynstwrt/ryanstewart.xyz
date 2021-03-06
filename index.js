// user variables
const frameTransitionSeconds = .8;

// internal variables
const clickCatcher = document.getElementById("click-catcher");
clickCatcher.style.zIndex = "99999";
const frames = document.getElementsByClassName("frame");
let frameIndex = 0;
let isPresentingFrame = false;

// hide the previous frame and then show the next one.
// calls a setup function for each frame at the start
function handleFrame(index)
{
    isPresentingFrame = true;

    const frame = frames[index];
    const prevFrame = frame.previousElementSibling;

    const setupFunction = window[`before${frame.id}`];
    if (setupFunction) setupFunction(frame);

    if (prevFrame)
    {
        prevFrame.style.opacity = "0";
        setTimeout(() =>
        {
            frame.style.opacity = "1";
            setTimeout(() =>
            {
                frameHandlingDone(frame);
            }, frameTransitionSeconds * 1000);
        }, frameTransitionSeconds * 1000);
    }
    else
    {
        frame.style.opacity = "1";
        setTimeout(() =>
        {
            frameHandlingDone(frame);
        }, frameTransitionSeconds * 1000);
    }
}

// function called with the frame after it is presented
function frameHandlingDone(frame)
{
    // call the after-presentation function for the frame if it exists.
    const afterFunction = window[`after${frame.id}`];
    if (afterFunction)
    {
        setTimeout(() =>
        {
            ++frameIndex;
            isPresentingFrame = false;
        }, afterFunction()); // afterFunction() returns how many ms to wait
        return;
    }

    ++frameIndex;
    isPresentingFrame = false;
}

// when the "page" (actually click catcher div over page) is clicked
clickCatcher.addEventListener("click", () =>
{
    if (isPresentingFrame || frameIndex >= frames.length) return;
    handleFrame(frameIndex);
});

// set each frame's z-index to z-index of clickCatcher - index - 1;
for (let i = 0; i < frames.length; ++i)
    frames[i].style.zIndex = (clickCatcher.style.zIndex - i - 1).toString();

handleFrame(frameIndex);