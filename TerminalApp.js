const readline = require('readline');

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class terminalApp {
    constructor({ Emoji, SaveFile, FileExtension, Logger }) {
        this.Emoji = Emoji;
        this.SaveFile = SaveFile;
        this.FileExtension = FileExtension;
        this.Logger = Logger;        
    }

    execute() {
        let fileName;
        let content;
        
        rlInterface.question("Enter some text: ", (text) => {
            content = this.Emoji.textToEmoji(text);
            
            rlInterface.question("Enter a file name: ", (text) => {
                
                fileName = this.FileExtension.checkFileExtension(text);
                if (text.length === 0) {
                    this.Logger.warn(`You did not enter a filename so we have generated one for you: ${fileName}`)               
                }

                this.SaveFile.saveFile(fileName, content, this.Logger);

                rlInterface.close();
            });
        });
    }
}

module.exports = terminalApp;