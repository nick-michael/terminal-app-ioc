class Container {
    constructor() {
        this.packages = {};
    }

    register(packageName, packageClass, dependencies = []) {
        let err;

        err = this._isInvalidName(packageName);
        if (err) {
            console.error(err);
            return false;
        }

        err = this._isDuplicate(packageName);
        if (err) {
            console.error(err);
            return false;
        }

        err = this._isInvalidDependencies(dependencies);
        if (err) {
            err.name = "DependencyError"            
            console.error(err);
            return false;
        }

        err = this._isSelfDependent(packageName, dependencies);
        if (err) {
            err.name = "DependencyError"            
            console.error(err);
            return false;
        }

        err = this._isUnknownDependencies(dependencies)
        if (err) {
            err.name = "DependencyError"            
            console.error(err);
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

        console.error(new Error("A package with this name does not exist"));
        return false;
    }

    listAll() {
        return Object.keys(this.packages)
    }

    _isInvalidName(packageName) {
        if (typeof packageName !== 'string') {
            return new Error("Invalid package name - your package name must be a string");
        }
    }

    _isDuplicate(packageName) {
        if (this.packages[packageName]) {
            return new Error("A package with this name has already been registered");
        }
    }

    _isInvalidDependencies(dependencies) {
        if (dependencies.constructor !== Array) {
            return new Error("The list of dependencies should be in the format of an Array of Strings. You can use `listAll()` to see which packages are available");
        }
    }

    _isSelfDependent(packageName, dependencies) {
        if (dependencies.includes(packageName)) {
            return new Error("Your package must not be a dependency of itself");
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
            return new Error(`Your package contains unknown dependencies: ${invalidDependencies}`)
        }
    }
};

module.exports = Container;