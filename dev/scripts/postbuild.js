const fs = require('fs');
const path = require('path');

const pathToDistPackageJson = './dist/package.json';

const cwd = process.cwd();
const packageJson = require(path.join(cwd, pathToDistPackageJson));

const { preinstall, ...scripts } = packageJson.scripts;

const updatedPackageJson = { ...packageJson, scripts };
const serializedPackageJson = JSON.stringify(updatedPackageJson, undefined, 4);

fs.writeFileSync(pathToDistPackageJson, serializedPackageJson);
