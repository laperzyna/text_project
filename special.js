var sentences = [
    ["Keep", "it", "cuteee,", "manito,", "keep", "it", "cute"],
    ["Que", "aquí", "el", "mejor", "artista", "es", "Dios"],
    ["Keep", "it", "cuteee,", "manito,", "keep", "it", "cute"],
    ["Que", "aquí", "el", "mejor", "artista", "es", "Dios"],
];

var currentSentence = 0;
var currentWord = 0;
var textContainer = document.getElementById('text-container');

function displayNextWord() {
    if (currentWord < sentences[currentSentence].length) {
        var wordSpan = document.createElement('span');
        wordSpan.textContent = sentences[currentSentence][currentWord] + " ";
        wordSpan.style.marginRight = "20px";
        wordSpan.style.opacity = 0;
        wordSpan.style.transition = 'opacity 0.5s';

        textContainer.appendChild(wordSpan);

        setTimeout(() => {
            wordSpan.style.opacity = 1;
        }, 10);

        currentWord++;
        setTimeout(displayNextWord, 500);
    } else if (currentSentence < sentences.length - 1) {
        // start next sentence
        textContainer.style.transition = 'opacity 2s';
        textContainer.style.opacity = '0';
        setTimeout(() => {
            textContainer.innerHTML = '';
            textContainer.style.opacity = '1';
            currentSentence++;
            currentWord = 0;
            // start next sentence
            displayNextWord();
        }, 2000);
    }
}

displayNextWord();