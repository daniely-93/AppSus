export default {
    getRandomId,
    getRandomColor,
    saveToStorage,
    loadFromStorage,
    getRandomSentence
}

function getRandomId(length = 8) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function getRandomColor(light = false) {
    var letters = '0123456789abcdef';
    if (light) letters = '89abcdef';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
}

function getRandomSentence() {
    let latters = 'abcdefghijklmnopqrstuvwxyz'
    let wordsLength = Math.floor(Math.random() * 50);
    let sentence = ''
    for (let i = 0; i < wordsLength; i++) {
        let wordLength = Math.floor(Math.random() * 10);
        for (let j = 0; j < wordLength; j++) {
            sentence += latters.charAt(Math.floor(Math.random() * wordLength));
        }
        sentence += ' ';
    }
    return sentence;
}
