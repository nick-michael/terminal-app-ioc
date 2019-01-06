import { AddonTypes, CommonAddon, LoggerInterface, SaveFileInterface } from '../common-addon';

const fs = require('fs');

export class SaveFile extends CommonAddon implements SaveFileInterface {
  constructor() {
    super();
    this.type = AddonTypes.SaveFile;
    this.dependencies = [AddonTypes.Logger];
  }

  public saveFile(fileName, content) {
    if (!this.isInitialised) {
      this.notInitialisedError();
      return;
    }

    const logger = this.container.get(AddonTypes.Logger) as LoggerInterface;

    fs.writeFile(fileName, content, (err) => {
      if (err) {
        logger.error(err);
      }
      logger.log(`File has been successfully saved as ${fileName}`);
    });
  }
};
