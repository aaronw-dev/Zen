var quotes = []
var selectedQuote
const quoteBlock = document.getElementById("quote-block")
const quoteAuthor = document.getElementById("quote-author")
async function getQuotes() {
    await fetch("../json/quotes.json")
        .then((data) => data.json())
        .then(json => { quotes = json.quotes })
    selectedQuote = quotes[getRandomInt(quotes.length - 1)]
    quoteBlock.innerHTML = selectedQuote.quote
    quoteAuthor.innerHTML = selectedQuote.author
    console.log(selectedQuote)
}
getQuotes()