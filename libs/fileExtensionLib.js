const checkFileExtension = (text) => {
    let fileName;

    if (text.length === 0) {
        fileName = 'randomName123';
    } else {
        fileName = text.split('.')[0];
    }

    fileName += '.txt';

    return fileName;
};

module.exports = {
    checkFileExtension,
}