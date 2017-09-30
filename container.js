const TerminalApp = require('./terminalApp');
const emojiLib = require('./libs/emojiLib');
const fsLib = require('./libs/fsLib');
const fileExtensionLib = require('./libs/fileExtensionLib');
const loggerLib = require('./libs/loggerLib');

const myTerminalApp = new TerminalApp({ emojiLib, fsLib, fileExtensionLib, loggerLib });

myTerminalApp.execute();