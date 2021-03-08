const wave = new Wave();

navigator.mediaDevices.getUserMedia({audio: true}).then(stream =>
{
   wave.fromStream(stream, "audio-visual", {
       type: "shine",
       color: ["red", "white", "orange"]
   });
}).catch(err =>
{
    console.error(err);
});
