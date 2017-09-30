const textToEmoji = (text) => {
    const regExKeys = Object.keys(emojiMap).map(key => (key.replace(/\)|\(|\||\//g, (match) => (`\\${match}`))));
    const regEx = new RegExp(regExKeys.join("|"),"gi"); 
    return (text.replace(regEx, (match) => (emojiMap[match])))
};

const emojiMap = {
    ":)": "🙂",
    ":D": "😀",
    ":(": "🙁",
    ":|": "😑",
    ":/": "😕",
    ":O": "😯",
};

module.exports = {
    textToEmoji,
}