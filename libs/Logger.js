const prefixTime = (message) => {
    const d = new Date();
    const time = d.toLocaleTimeString();
    
    const newMessage = `[${time}] - ${message}`;

    return newMessage;
};

class LoggerLib {
    log(message) {
        console.log(prefixTime(message)); 
    }

    warn(message) {
        console.warn(prefixTime(message));
    }

    error(message) {
        console.error(prefixTime(message));
    }
};

module.exports = LoggerLib;