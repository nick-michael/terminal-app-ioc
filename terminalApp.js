const readline = require('readline');

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class terminalApp {
    constructor({ emojiLib, fsLib, fileExtensionLib, loggerLib }) {
        this.emojiLib = emojiLib;
        this.fsLib = fsLib;
        this.fileExtensionLib = fileExtensionLib;
        this.loggerLib = loggerLib;        
    }

    execute() {
        let fileName;
        let content;
        
        rlInterface.question("Enter some text: ", (text) => {
            content = this.emojiLib.textToEmoji(text);
            
            rlInterface.question("Enter a file name: ", (text) => {
                
                fileName = this.fileExtensionLib.checkFileExtension(text);
                if (text.length === 0) {
                    this.loggerLib.warn(`You did not enter a filename so we have generated one for you: ${fileName}`)               
                }

                this.fsLib.saveFile(fileName, content, this.loggerLib);

                rlInterface.close();
            });
        });
    }
}

module.exports = terminalApp;