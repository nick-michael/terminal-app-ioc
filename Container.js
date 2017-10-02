class Container {
    constructor() {
        this.packages = {};
    }

    register(packageName, packageClass, dependencies = []) {
        if (
            this._isInvalidName(packageName) ||
            this._isDuplicate(packageName) ||
            this._isInvalidDependencies(dependencies) ||
            this._isSelfDependent(packageName, dependencies) ||
            this._isUnknownDependencies(dependencies)
        ) {
            return false;
        }

        try {
            const dependencyPackages = {};
            dependencies.forEach(dependency => {
                dependencyPackages[dependency] = this.get(dependency);
            });

            const compiledPackage = new packageClass(dependencyPackages);
            this.packages[packageName] = { package: compiledPackage, dependencies }
            return true;
        } catch(err) {
            console.error(err);
            return false;
        };
    }

    get(packageName) {
        if (this.packages[packageName]) {
            return this.packages[packageName].package
        }
        console.error(new Error("A package with this name does not exist - you can use `listAll()` to see which packages are available"));
        return false;
    }

    listAll() {
        return Object.keys(this.packages)
    }

    _isInvalidName(packageName) {
        if (typeof packageName !== 'string') {
            console.error(new Error("Invalid package name: your package name must be a string - you can use `listAll()` to see which packages are available"));
            return true;
        }
    }

    _isDuplicate(packageName) {
        if (this.packages[packageName]) {
            console.error(new Error("A package with this name has already been registered - you can use `listAll()` to see which packages are available"));
            return true;            
        }
    }

    _isInvalidDependencies(dependencies) {
        if (dependencies.constructor !== Array) {
            console.error(new Error("The list of dependencies should be in the format of an Array of Strings. You can use `listAll()` to see which packages are available"));
            return true;            
        }
    }

    _isSelfDependent(packageName, dependencies) {
        if (dependencies.includes(packageName)) {
            console.error(new Error("Your package must not be a dependency of itself"));
            return true;            
        }
    }

    _isUnknownDependencies(dependencies){
        const invalidDependencies = [];
        dependencies.forEach(dependency => {
            if (!this.packages[dependency]) {
                invalidDependencies.push(dependency)
            }
        });

        if (invalidDependencies.length > 0) {
            console.error(new Error(`Your package contains unknown dependencies: ${invalidDependencies}`));
            return true;            
        }
    }
};

module.exports = Container;