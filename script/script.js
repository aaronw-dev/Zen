var openPanels = []
function openPanel(id) {
    let targetPanel = document.getElementById(id)
    if (targetPanel != null) {
        if (!targetPanel.className.split(" ").includes("open")) {
            targetPanel.style.zIndex = 100;
            targetPanel.classList.add("open")
            openPanels.push(targetPanel)
            console.log("e")
        }
    } else {
        throw new Error("That panel doesn't exist!")
    }
}

document.addEventListener('swiped-left', function (e) {
    console.log(e.target);
    console.log(e.detail);
});

document.addEventListener('swiped-right', function (e) {
    console.log(openPanels)
    openPanels.at(-1).classList.remove("open")
});