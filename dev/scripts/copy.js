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
            if (err.code === 'EEXIST') {
                return curDir;
            }

            if (err.code === 'ENOENT') {
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err;
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
    const targetPath = path.join(outputDir, file);
    const targetFile = fs.readFileSync(file, { encoding: 'utf-8' });
    fs.writeFileSync(targetPath, targetFile);
});
