const fs = require('fs');
const path = require('path');
const { CommonScripts } = require('@eigenspace/helper-scripts');

const outputDir = './dist';
const files = [
    'package.json',
    'tslint.base.json',
    'base.tsconfig.json',
    'README.md',
    'rules/pluralize/pluralize.js',
    'scripts/markdown-lint.js'
];

CommonScripts.createDirectory(`${outputDir}/rules/pluralize/`);
CommonScripts.createDirectory(`${outputDir}/scripts/`);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

files.forEach(file => {
    const targetPath = path.join(outputDir, file);
    const targetFile = fs.readFileSync(file, { encoding: 'utf-8' });
    fs.writeFileSync(targetPath, targetFile);
});

fs.renameSync(path.join(outputDir, 'tslint.base.json'), path.join(outputDir, 'tslint.json'));