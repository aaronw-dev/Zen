const journalDateText = document.getElementById("journaldate")
const journalTitle = document.getElementById("journal-title")
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

let now = new Date()
journalDateText.innerHTML = now.toLocaleDateString(undefined, options) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + now.toLocaleTimeString();
var currentJournalName = localStorage.getItem("currentJournal") != null ? localStorage.getItem("currentJournal"):"test"
journalTitle.value = currentJournalName
journalTitle.addEventListener("input", (e)=>{
    currentJournalName = journalTitle.value
    localStorage.setItem("currentJournal",currentJournalName)
})