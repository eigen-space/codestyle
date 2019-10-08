const path = require('path');
const exec = require('child_process').execSync;

const relativePrefix = '../..';
const dirs = [`${relativePrefix}/src/packages/eslint-plugin-eigenspace-script`];

dirs.forEach(dir => {
    const execOptions = {
        cwd: path.join(__dirname, dir),
        stdio: [process.stdin, process.stdout, process.stderr]
    };

    // Before build we must install deps also
    exec('yarn && yarn build', execOptions);
});