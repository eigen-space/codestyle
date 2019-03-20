const fs = require('fs');
const path = require('path');

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
}

const outputDir = './dist';
const files = [
    'package.json',
    'tslint.json',
    'base.tsconfig.json',
    'README.md',
    'rules/pluralize/pluralize.js'
];

mkDirByPathSync(`${outputDir}/rules/pluralize/`);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

files.forEach(file => {
    fs.writeFileSync(path.join(outputDir, file), fs.readFileSync(file, { encoding: 'utf-8' }));
});
