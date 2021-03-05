const clickCatcher = document.getElementById("click-catcher");
const frames = document.getElementsByClassName("frame");
let frameIndex = 0;
let isPresentingFrame = false;
const frameTransitionSeconds = 1.25;

function hideFrame(frame)
{
    frame.style.opacity = "0";

    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            frame.style.display = "none";
            resolve();
        }, frameTransitionSeconds * 1000);
    });
}

function presentFrame(frame)
{
    isPresentingFrame = true;
    frame.style.display = "inherit";

    // TODO: jumps in but fades out
    frame.style.opacity = "1";

    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            resolve();
        }, frameTransitionSeconds * 1000);
    });
}

clickCatcher.addEventListener("click", () =>
{
    if (isPresentingFrame || frameIndex >= frames.length) return;

    const prevFrame = frames[frameIndex - 1];
    const frame = frames[frameIndex];

    // hide last frame then show first frame
    hideFrame(prevFrame).then(() =>
    {
        presentFrame(frame).then(() =>
        {
            isPresentingFrame = false;
            ++frameIndex;
        });
    });
});

// show first frame
// presentFrame(frames[frameIndex]).then(() =>
// {
//     isPresentingFrame = false;
//     ++frameIndex;
// });