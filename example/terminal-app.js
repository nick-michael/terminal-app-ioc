const readline = require('readline');

const { AddonTypes } = require('./lib/common-addon');
const { Container } = require('./lib/container');
const { EmojiText } = require('./lib/addons/emoji');
const { SaveFile } = require('./lib/addons/save-file');
const { FileExtensionValidator } = require('./lib/addons/file-extension');
const { Logger } = require('./lib/addons/logger');

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class TerminalApp {
    constructor() {
        const container = new Container();
        const emojiAddon = new EmojiText();
        const saveFileAddon = new SaveFile();
        const fileExtensionAddon = new FileExtensionValidator('js');
        const loggerAddon = new Logger();

        container.register([ emojiAddon, saveFileAddon, fileExtensionAddon, loggerAddon ]);
        container.initialise();
        this.container = container;
    }

    execute() {
        let fileName;
        let content;

        const emojiAddon = this.container.get(AddonTypes.TextTransformer);
        const fileExtensionAddon = this.container.get(AddonTypes.FileExtensionValidator);
        const saveFileAddon = this.container.get(AddonTypes.SaveFile);
        
        rlInterface.question("Enter some text: ", (text) => {
            content = emojiAddon.transform(text);
            
            rlInterface.question("Enter a file name: ", (text) => {
                
                fileName = fileExtensionAddon.checkFileExtension(text);
                if (text.length === 0) {
                    this.Logger.warn(`You did not enter a filename so we have generated one for you: ${fileName}`)               
                }

                saveFileAddon.saveFile(fileName, content);

                rlInterface.close();
            });
        });
    }
}

module.exports = TerminalApp;