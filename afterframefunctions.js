/*
    These functions are called for each frame (if the function exists)
    after the previous frame is hidden and the current one is presented.

    Used for starting an animation after load, etc.

    Returns how many milliseconds to wait
*/

function afterFrame1(frame)
{
    const letterObjects = document.getElementById("wave").children;
    const delayFactor = 1 / 50;

    for (let i = 0; i < letterObjects.length; ++i)
    {
        letterObjects[i].style.animation = `wave-text .5s ${i * delayFactor}s linear alternate`;
    }

    return letterObjects.length * delayFactor * 1000;
}