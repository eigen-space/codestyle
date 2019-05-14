/**
 * Script automates linting a readme file.
 * This rule is following that style:
 *      - Checks that readme file exist
 *      - Checks there is a section with dependencies
 *      - Checks there are dependencies in a dependency section
 */

const fs = require('fs');
const currentDir = process.cwd();
const readme = fs.readFileSync(`${currentDir}/README.md`, 'utf8');
const packageJson = require(`${currentDir}/package.json`);
const endOfLine = require('os').EOL;

const FAILURE_STRING_NO_README = 'No README file in root directory';
const FAILURE_STRING_MISSING_TYPES = 'You have not described these dependency sections in README: ';
const FAILURE_STRING_EXCESS_TYPES = 'You have excess dependency sections in README: ';
const FAILURE_STRING_MISSING_DEPENDENCIES = 'You have not described these dependencies in README';
const FAILURE_STRING_EXCESS_DEPENDENCIES = 'You have excess dependencies in README';

if (!readme) {
    throw new Error(FAILURE_STRING_NO_README);
}

const dependencyTypes = [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies'
];

const DEPENDENCY_SECTION_TITLE_PREFIX = '# Why do we have that ';
const END_OF_LINE_BLOCK = `(${endOfLine})`;
const DEPENDENCY_SECTION_PATTERN = new RegExp(`${DEPENDENCY_SECTION_TITLE_PREFIX}(.* )?dependencies\\?${END_OF_LINE_BLOCK}${END_OF_LINE_BLOCK}(.+${END_OF_LINE_BLOCK}?)*`, 'gm');
const DEPENDENCY_PATTERN = /(?<=\* `).*(?=` - )/g;

let hasFailure = false;

lint();

// Functions
// ----------

function lint() {
    const packageJsonDependenciesMap = getPackageJsonDependenciesMap();
    const readmeDependenciesMap = getReadmeDependenciesMap();

    compareDependencyMaps(packageJsonDependenciesMap, readmeDependenciesMap);

    if (hasFailure) {
        process.exit(1);
    }
}

function getPackageJsonDependenciesMap() {
    const dependencyTypesInProject = dependencyTypes.filter(depsType => packageJson[depsType]);
    return new Map(dependencyTypesInProject.map(depsType => [depsType, Object.keys(packageJson[depsType])]))
}

function getReadmeDependenciesMap() {
    const dependenciesMap = new Map();
    const dependencySections = findDependencySections() || [];

    dependencySections.forEach(section => {
        const sectionTitle = section.split(endOfLine)[0];
        const rawDependency = sectionTitle.replace(DEPENDENCY_SECTION_TITLE_PREFIX, '')
            .replace('?', '');
        const dependencyType = stringToCamelCase(rawDependency);
        const dependency = section.match(DEPENDENCY_PATTERN);
        dependenciesMap.set(dependencyType, dependency);
    });

    return dependenciesMap;
}

function findDependencySections() {
    return readme.match(DEPENDENCY_SECTION_PATTERN);
}

function stringToCamelCase(str) {
    return str.replace(/ [a-z]/g, subString => subString[1].toUpperCase());
}

function compareDependencyMaps(packageJsonDependenciesMap, readmeDependenciesMap) {
    const packageJsonDependencyTypes = Array.from(packageJsonDependenciesMap.keys());
    const readmeDependencyTypes = Array.from(readmeDependenciesMap.keys());

    const [missingTypes, excessTypes, commonTypes] = compareArrays(packageJsonDependencyTypes, readmeDependencyTypes);

    commonTypes.forEach(type => {
        const packageJsonDependencies = packageJsonDependenciesMap.get(type);
        const readmeDependencies = readmeDependenciesMap.get(type);

        let [missingKeys, excessKeys] = compareArrays(packageJsonDependencies, readmeDependencies);
        if (excessKeys.includes('@types/*')) {
            missingKeys = missingKeys.filter(key => !key.startsWith('@types/'));
            excessKeys = excessKeys.filter(key => key !== '@types/*');
        }

        reportDependencies(FAILURE_STRING_MISSING_DEPENDENCIES, type, missingKeys);
        reportDependencies(FAILURE_STRING_EXCESS_DEPENDENCIES, type, excessKeys);
    });

    reportTypes(FAILURE_STRING_MISSING_TYPES, missingTypes);
    reportTypes(FAILURE_STRING_EXCESS_TYPES, excessTypes);
}

function compareArrays(current, comparable) {
    const missingKeys = current.filter(key => !comparable.includes(key));
    const excessKeys = comparable.filter(key => !current.includes(key));
    const commonKeys = current.filter(key => comparable.includes(key));

    return [missingKeys, excessKeys, commonKeys];
}

function reportTypes(failureString, keys) {
    if (keys.length) {
        reportFailure(`${failureString} \n\t${keys.join(',\n\t')}`)
    }
}

function reportDependencies(failureString, dependencyType, keys) {
    if (keys.length) {
        reportFailure(`${failureString} in ${dependencyType} section: \n\t${keys.join(',\n\t')}`)
    }
}

function reportFailure(str) {
    hasFailure = true;
    console.error(str)
}