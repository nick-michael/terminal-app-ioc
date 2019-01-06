import { AddonTypes, CommonAddon, LoggerInterface } from '../common-addon';

const prefixTime = (message) => {
  const d = new Date();
  const time = d.toLocaleTimeString();

  const newMessage = `[${time}] - ${message}`;

  return newMessage;
};

export class Logger extends CommonAddon implements LoggerInterface {
  constructor() {
    super();
    this.type = AddonTypes.Logger;
  }

  public log(message) {
    console.log(prefixTime(message));
  };

  public warn(message) {
    console.warn(prefixTime(message));
  };

  public error(message) {
    console.error(prefixTime(message));
  };
};
