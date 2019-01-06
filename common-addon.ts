import { Container } from './container';

export enum AddonTypes {
  TextTransformer = 'TextTransformer',
  FileExtensionValidator = 'FileExtensionValidator',
  Logger = 'Logger',
  SaveFile = 'SaveFile',
};

export interface AddonInterface {
  type: string,
  dependencies: Array<AddonTypes>,
  isInitialised: boolean,
  container: Container,
  initialise(container: Container): void,
  notInitialisedError(): void,
};

export interface FileExtensionValidatorInterface extends AddonInterface {
  checkFileExtension(text: string): string,
};

export interface LoggerInterface extends AddonInterface {
  log(message: string): void,
  warn(message: string): void,
  error(message: string): void,
};

export interface SaveFileInterface extends AddonInterface {
  saveFile(fileName: string, content: string): void;
};

export interface TextTransformerInterface extends AddonInterface {
  transform(text: string): string,
};

export class CommonAddon implements AddonInterface {
  private _type;
  private _dependencies = [];
  private _isInitialised: boolean = false;
  private _container: Container;

  public initialise(container) {
    this._container = container;
    this._isInitialised = true;
  }

  public notInitialisedError() {
    throw new Error(`Error In: ${this._type} - Addon has not been initialised`)
  }

  public get type(): AddonTypes {
    return this._type;
  }

  public set type(type: AddonTypes) {
    this._type = type;
  }

  public get dependencies(): Array<AddonTypes> {
    return this._dependencies;
  }

  public set dependencies(dependencies: Array<AddonTypes>) {
    this._dependencies = dependencies;
  }

  public get isInitialised(): boolean {
    return this._isInitialised;
  }

  public get container(): Container {
    return this._container;
  }
};