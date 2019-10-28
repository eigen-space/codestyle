const { removeDirectory, copy } = require('@eigenspace/helper-scripts');
const fs = require('fs');

const outputDir = './dist';

if (fs.existsSync(outputDir)) {
    removeDirectory(outputDir);
}

const files = [
    'package.json',
    'yarn.lock',
    'src/configs',
    'src/scripts'
];

copy(files, outputDir);
