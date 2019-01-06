import { AddonTypes, CommonAddon, FileExtensionValidatorInterface } from '../common-addon';

export class FileExtensionValidator extends CommonAddon implements FileExtensionValidatorInterface {
  private fileExtension;

  constructor(fileExtension: string = 'txt') {
    super();
    this.fileExtension = fileExtension;
    this.type = AddonTypes.FileExtensionValidator;
  }

  public checkFileExtension(text) {
    let fileName;
    if (text.length === 0) {
      fileName = 'randomName123';
    } else {
      fileName = text.split('.')[0];
    }

    return `${fileName}.${this.fileExtension}`;
  };
};
