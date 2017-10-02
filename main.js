const Container = require('./Container');
const TerminalApp = require('./TerminalApp');
const Emoji = require('./libs/Emoji');
const SaveFile = require('./libs/SaveFile');
const FileExtension = require('./libs/FileExtension');
const Logger = require('./libs/Logger');


const container = new Container();

container.register('Emoji', Emoji);
container.register('Logger', Logger);
container.register('SaveFile', SaveFile, ['Logger']);
container.register('FileExtension', FileExtension);
container.register('TerminalApp', TerminalApp, ['Emoji', 'SaveFile', 'FileExtension', 'Logger']);

const terminalApp = container.get('TerminalApp');
terminalApp.execute();