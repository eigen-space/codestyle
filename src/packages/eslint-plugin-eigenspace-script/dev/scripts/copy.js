const { removeDirectory, copy } = require('@eigenspace/helper-scripts');
const fs = require('fs');

const outputDir = './dist';
const files = ['package.json', 'yarn.lock', 'README.md'];

if (fs.existsSync(outputDir)) {
    removeDirectory(outputDir);
}

copy(files, outputDir);
