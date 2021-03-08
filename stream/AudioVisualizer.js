// handle canvas size and resizing.
const canvas = document.getElementById("visualizer-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const ctx = new (window.AudioContext || window.webkitAudioContext)();
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream =>
{
    const mic = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    mic.connect(analyser);
    requestAnimationFrame(() => { visualize(analyser); });
}).catch(err =>
{
    console.error(err);
});


const context = canvas.getContext("2d");
function visualize(analyser)
{
    const bufferLength = analyser.frequencyBinCount;
    let data = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(data);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = 5;
    context.strokeStyle = "#D7D9CE";
    context.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; ++i)
    {
        const v = data[i] / 128.0;
        const y = v * (canvas.height / 2);

        if (i === 0)
            context.moveTo(x, y);
        else
            context.lineTo(x, y);

        x += sliceWidth;
    }

    context.lineTo(canvas.width, canvas.height / 2 );
    context.stroke();

    requestAnimationFrame(() => { visualize(analyser); });
}