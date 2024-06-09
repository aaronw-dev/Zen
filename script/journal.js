const journalDateText = document.getElementById("journaldate")
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

journalDateText.innerHTML = new Date().toLocaleDateString(undefined, options);