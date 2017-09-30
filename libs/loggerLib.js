const log = (message) => {
    console.log(prefixTime(message));
};

const warn = (message) => {
    console.warn(prefixTime(message));
};

const error = (message) => {
    console.error(prefixTime(message));
};


const prefixTime = (message) => {
    const d = new Date();
    const time = d.toLocaleTimeString();
    
    const newMessage = `[${time}] - ${message}`;

    return newMessage;
};

module.exports = {
    log,
    warn,
    error,
}