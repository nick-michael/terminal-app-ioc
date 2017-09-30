const fs = require('fs');

const saveFile = (fileName, content, logger) => {
    return fs.writeFile(fileName, content, (err) => {
        if (err) {
            logger.error(err);
        }
        
        logger.log(`File has been successfully saved as ${fileName}`);
    });
};

module.exports = {
    saveFile,
}