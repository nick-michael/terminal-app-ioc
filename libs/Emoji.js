const emojiMap = {
    ":)": "🙂",
    ":D": "😀",
    ":(": "🙁",
    ":|": "😑",
    ":/": "😕",
    ":O": "😯",
};

class EmojiLib {    
    textToEmoji(text) {
        const regExKeys = Object.keys(emojiMap).map(key => (key.replace(/\)|\(|\||\//g, (match) => (`\\${match}`))));
        const regEx = new RegExp(regExKeys.join("|"),"gi"); 
        return (text.replace(regEx, (match) => (emojiMap[match])))
    }
};

module.exports = EmojiLib;