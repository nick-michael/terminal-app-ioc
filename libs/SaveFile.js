const fs = require('fs');

class SaveFile {
    constructor({ Logger }) {
        this.Logger = Logger
    }

    saveFile(fileName, content) {
        return fs.writeFile(fileName, content, (err) => {
            if (err) {
                this.Logger.error(err);
            }
            
            this.Logger.log(`File has been successfully saved as ${fileName}`);
        });
    }
};

module.exports = SaveFile;
