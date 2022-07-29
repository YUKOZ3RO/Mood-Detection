const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err),
  );
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections[0].expressions);

    const sad = document.getElementById("Sad");
    sad.innerText = "Sad: " + detections[0].expressions?.sad.toFixed(5);
    sad.style.opacity = +detections[0].expressions?.sad.toFixed(5);

    const happy = document.getElementById("Happy");
    happy.innerText = "Happy : " + detections[0].expressions.happy.toFixed(5);
    happy.style.opacity = +detections[0].expressions?.happy.toFixed(5);

    const disgusted = document.getElementById("Disgusted");
    disgusted.innerText =
      "Disgusted:" + detections[0].expressions?.disgusted.toFixed(5);

    disgusted.style.opacity = +detections[0].expressions?.disgusted.toFixed(5);

    const angry = document.getElementById("Angry");
    angry.innerText = "Angry : " + detections[0].expressions?.angry.toFixed(5);
    angry.style.opacity = +detections[0].expressions?.angry.toFixed(5);

    const surprised = document.getElementById("Surprised");
    surprised.innerText =
      "Surprised: " + detections[0].expressions?.surprised.toFixed(5);

    surprised.style.opacity = +detections[0].expressions?.surprised.toFixed(5);

    const fearful = document.getElementById("Fearful");
    fearful.innerText =
      "Fearful:" + detections[0].expressions?.fearful.toFixed(5);

    fearful.style.opacity = +detections[0].expressions?.fearful.toFixed(5);

    const neutral = document.getElementById("Neutral");
    neutral.innerText =
      "Neutral:" + detections[0].expressions?.neutral.toFixed(5);

    neutral.style.opacity = +detections[0].expressions?.neutral.toFixed(5);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 1000);
});
