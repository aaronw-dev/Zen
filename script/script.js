var openPanels = []
const bottomNav = document.getElementById("bottomnav")
const transitionDiv = document.getElementById("transition")
const mindfulAudio = document.getElementById("mindful-audio")
const breathingProgress = document.getElementById("breathing-progress")
const breathingStart = document.getElementById("breathing-starttime")
const breathingEnd = document.getElementById("breathing-endtime")
const mindfulPlay = document.getElementById("playbutton")
const crisisModeSection = document.getElementById("crisismode")
const nameText = document.getElementById("name-text")

function generateKeys() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const crypt = new JSEncrypt({ default_key_size: 2048 });
            const pubkey = crypt.getPublicKey()
            const privkey = crypt.getPrivateKey()
            resolve({ pubkey, privkey });
        }, 50);
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function openPanel(id, cangoback = true) {
    let targetPanel = document.getElementById(id)
    if (targetPanel != null) {
        if (!targetPanel.className.split(" ").includes("open")) {
            targetPanel.style.zIndex = 100;
            targetPanel.classList.add("open")
            if (cangoback)
                openPanels.push(targetPanel)
            setNavOpen(openPanels.length == 0)
        }
    } else {
        throw new Error("That panel doesn't exist!")
    }
}
function setNavOpen(bool) {
    bool ? bottomNav.classList.remove("closed") : bottomNav.classList.add("closed")
}
function closeCurrentPanel() {
    mindfulAudio.pause()
    mindfulPlay.src = "/icons/play.svg"
    if (openPanels.length > 0) {
        openPanels.at(-1).classList.remove("open")
        openPanels.pop()
        setNavOpen(openPanels.length == 0)
    }
}
function transition() {
    transitionDiv.style.animation = "1s transition-red forwards";
    crisisModeSection.style.animation = "1s activateCrisisMode forwards 1s";
    console.log("crisis mode activate!")
}
document.addEventListener('swiped-left', function (e) {
});

document.addEventListener('swiped-right', function (e) { closeCurrentPanel() });

function openDashboard() {
    openPanel('dashboard', false);
    setNavOpen(true);
    localStorage.setItem("started", true)
}
if (localStorage.getItem("started")) {
    let targetPanel = document.getElementById("dashboard")
    targetPanel.style.zIndex = 99;
    targetPanel.style.left = 0;
    setNavOpen(openPanels.length == 0)
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    let paddedMinutes = String(minutes).padStart(2, '0');
    let paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}
async function startMindful(audiofile) {
    mindfulAudio.play()
    mindfulPlay.src = "/icons/pause.svg"
    openPanel("mindful-breathing")
    mindfulAudio.src = `audio/${audiofile}.mp3`
    await mindfulAudio.play()
    breathingEnd.innerHTML = formatTime(mindfulAudio.duration)
}
function updateMindfulPlayer() {
    breathingProgress.value = ((mindfulAudio.currentTime / mindfulAudio.duration) * 100).toString()
    breathingStart.innerHTML = formatTime(mindfulAudio.currentTime)
}
function playPauseMindful() {
    if (mindfulAudio.paused) {
        mindfulAudio.play()
        mindfulPlay.src = "/icons/pause.svg"
    } else {
        mindfulAudio.pause()
        mindfulPlay.src = "/icons/play.svg"
    }
}
breathingProgress.oninput = function (e) {
    mindfulAudio.currentTime = ((breathingProgress.value / 100) * mindfulAudio.duration)
    mindfulAudio.play()
}
var context = new AudioContext();
var src = context.createMediaElementSource(mindfulAudio);
var analyser = context.createAnalyser();

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

src.connect(analyser);
analyser.connect(context.destination);

analyser.fftSize = 256;

var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);

var dataArray = new Uint8Array(bufferLength);

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var barWidth = (WIDTH / bufferLength) * 2.5;
var barHeight;
var x = 0;

let extraWidth = 50
function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "#F6F6F6";
        ctx.fillRect(x, ((HEIGHT / 2) - barHeight) - extraWidth, barWidth / 2, (barHeight * 2) + extraWidth);

        x += barWidth + 1;
    }
}

function skipTime(time) {
    mindfulAudio.currentTime += time
}

function setNameText() {
    if (localStorage.getItem("name") != null) {
        nameText.innerHTML = "Good morning, " + localStorage.getItem("name") + "."
    }
}
setNameText()
renderFrame();

setInterval(updateMindfulPlayer, 50)
async function init(){
    const result = await generateKeys();
    console.log(result)
}
init()