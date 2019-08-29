const { removeDirectory, copy } = require('@eigenspace/helper-scripts');
const fs = require('fs');

const outputDir = './dist';
const files = [
    'package.json',
    'yarn.lock',
    'src/configs',
    'src/scripts',
    'src/packages',
    'README.md'
];

if (fs.existsSync(outputDir)) {
    removeDirectory(outputDir);
}

copy(files, outputDir);
