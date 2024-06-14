const journalDateText = document.getElementById("journaldate")
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

let now = new Date()
journalDateText.innerHTML = now.toLocaleDateString(undefined, options) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + now.toLocaleTimeString();