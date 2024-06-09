var openPanels = []
const bottomNav = document.getElementById("bottomnav")
const transitionDiv = document.getElementById("transition")
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
    console.log(openPanels.length)
}
function setNavOpen(bool) {
    bool ? bottomNav.classList.remove("closed") : bottomNav.classList.add("closed")
}
function closeCurrentPanel() {
    if (openPanels.length > 0) {
        openPanels.at(-1).classList.remove("open")
        openPanels.pop()
        setNavOpen(openPanels.length == 0)
    }
}
function transition() {
    transitionDiv.style.animation = "1s transition-red forwards";
}
document.addEventListener('swiped-left', function (e) {
});

document.addEventListener('swiped-right', function (e) { closeCurrentPanel() });