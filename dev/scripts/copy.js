const fs = require('fs');
const path = require('path');

const outputDir = './dist';
const files = ['package.json', 'rules.json'];


if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

files.forEach(file => {
    fs.writeFileSync(path.join(outputDir, file), fs.readFileSync(file, { encoding: 'utf-8' }));
});