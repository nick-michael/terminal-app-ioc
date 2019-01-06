import { AddonInterface, AddonTypes } from './common-addon';

export interface ContainerInterface {
  register(addons: AddonInterface | Array<AddonInterface>): boolean,
  get(name: String): AddonInterface,
  listAll(): Array<string>,
  initialise(): void,
};

export class Container implements ContainerInterface {
  private addons = {};

  register(addons) {
    const addonsArray = new Array().concat(addons);
    addonsArray.forEach((addon: AddonInterface) => {
      const { type, dependencies } = addon;
      if (
        this._isInvalidType(type) ||
        this._isDuplicate(type) ||
        this._isInvalidDependencies(dependencies) ||
        this._isSelfDependent(type, dependencies)
      ) {
        return false;
      }

      this.addons[type] = addon;
    });
    return true;
  }

  public initialise() {
    Object.values(this.addons).forEach((addon: AddonInterface) => {
      if (
        this._isUnavailableDependencies(addon.dependencies) ||
        this._isCircularDependencies(addon.type)
      ) {
        return false;
      }
      addon.initialise(this);
    });
  }

  public get(addonType: AddonTypes) {
    if (this.addons[addonType]) {
      return this.addons[addonType];
    }
    console.error(new Error("A addon of this type does not exist - you can use `listAll()` to see which addons are available"));
    return false;
  }

  public listAll() {
    return Object.keys(this.addons)
  }

  private _isInvalidType(addonType) {
    const supportedTypes = Object.values(AddonTypes);
    if (!supportedTypes.includes(addonType)) {
      console.error(new Error(`Invalid addon type: your addon type is not supported. Remember to set the addon type in the constructor. Supported addons should be one of: ${supportedTypes}`));
      return true;
    }
  }

  private _isDuplicate(addonType) {
    if (this.addons[addonType]) {
      console.error(new Error("A addon of this type has already been registered - you can use `listAll()` to see which addons have been registered"));
      return true;
    }
  }

  private _isInvalidDependencies(dependencies) {
    const supportedTypes = Object.values(AddonTypes);
    const hasInvalidDependencies = dependencies.some(dependency => {
      return !supportedTypes.includes(dependency);
    });
    if (hasInvalidDependencies) {
      console.error(new Error(`The list of dependencies should be an array of addon types. Supported addons should be one of: ${supportedTypes}`));
      return true;
    }
  }

  private _isSelfDependent(addonType, dependencies) {
    if (dependencies.includes(addonType)) {
      console.error(new Error("Your addon must not be a dependency of itself"));
      return true;
    }
  }

  private _isUnavailableDependencies(dependencies) {
    const invalidDependencies = [];
    dependencies.forEach(dependency => {
      if (!this.addons[dependency]) {
        invalidDependencies.push(dependency)
      }
    });

    if (invalidDependencies.length > 0) {
      console.error(new Error(`Your addon contains unregistered dependencies: ${invalidDependencies}`));
      return true;
    }
  }

  private _isCircularDependencies(type) {
    const subDependencies = this._recursiveGetSubDependencies(type);
    const isCircular = subDependencies.includes(type);
    if (isCircular) {
      console.error(new Error("Your addon contains dependencies which are depentant on it"));
      return true;
    }
  }

  private _recursiveGetSubDependencies(type, found = []) {
    const { dependencies } = this.addons[type];
    const newDependencies = dependencies.filter(d => !found.includes(d));

    if (newDependencies.length === 0) {
      return [];
    }

    found.push(...newDependencies);

    newDependencies.forEach(d => {
      found.push(...this._recursiveGetSubDependencies(d, found));
    });
    return found;
  }
};
