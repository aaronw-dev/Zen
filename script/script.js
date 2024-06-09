
function openPanel(id) {
    let targetPanel = document.getElementById(id)
    if (targetPanel != null) {
        if (!targetPanel.className.split(" ").includes("open")) {
            targetPanel.style.zIndex = 100;
            targetPanel.classList.add("open")
            console.log("e")
        }
    } else {
        throw new Error("That panel doesn't exist!")
    }
}