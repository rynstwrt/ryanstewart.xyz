/*
    These functions are called for each frame (if the function exists)
    before the previous frame is hidden and the current one is presented.

    Used for setting up each frame if needed.
*/

function beforeFrame1(frame)
{
    const p = frame.firstElementChild;
    const pText = p.textContent;
    p.textContent = "";

    const letters = pText.trim().split("");
    for (let i = 0; i < letters.length; ++i)
    {
        const letter = letters[i];
        const innerP = document.createElement("p");
        innerP.textContent = letter;
        p.append(innerP);
    }
}

function beforeFrame3(frame)
{
    // TODO: terminal style dialog
    const lines = [""];
}