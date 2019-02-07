const fs = require('fs');
const path = require('path');

const outputDir = './dist';
const files = ['package.json', 'tslint.json', 'base.tsconfig.json', 'README.md'];

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

files.forEach(file => {
    fs.writeFileSync(path.join(outputDir, file), fs.readFileSync(file, { encoding: 'utf-8' }));
});
