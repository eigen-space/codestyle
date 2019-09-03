const path = require('path');
const fs = require('fs');
const os = require('os');
const googleSpreadsheet = require('google-spreadsheet');
const creds = require('../credentials/google-sheets-credentials.json');

// The Google Sheet ID found in the URL of your Google Sheet.
const SPREADSHEET_ID = '1phevI9VxclD8QsHYr5Stu-nlvUjJ3taBujgu1JOUqlg';

const PATH_TO_DOCS = '../../doc';
const StatusType = {
    AUTOMATED: 'Автоматизировано',
    NON_AUTOMATED: 'Не автоматизировано',
    PARTLY_AUTOMATED: 'Частично автоматизировано'
};

const ID_REGEXP = /(([#]+ ([\d+.]+))|(\w\.))/.toString().slice(1, -1);
const STATUS_REGEXP = new RegExp(`(${StatusType.NON_AUTOMATED})|(${StatusType.PARTLY_AUTOMATED})|(${StatusType.AUTOMATED})`).toString().slice(1, -1);
const NAME_REGEXP = /.*/.toString().slice(1, -1);
const OPEN_BRACKET_REGEXP = /\\\[/.toString().slice(1, -1);
const CLOSE_BRACKET_REGEXP = /\\\]/.toString().slice(1, -1);
const END_REGEXP = new RegExp(`(${os.EOL}.+)*`).toString().slice(1, -1);

const RULE_REGEXP = new RegExp(`${ID_REGEXP} ${OPEN_BRACKET_REGEXP}(${STATUS_REGEXP})(${NAME_REGEXP})${CLOSE_BRACKET_REGEXP} (.+${END_REGEXP})`, 'gm');

const sampleRow = {
    _id: 421,
    name: 'Использование функций-обёрток',
    status: 'Автоматизировано',
    rule: 'no-implicit-coercion',
    localized: 'Yes',
    violations: 23,
    link: 'https://github.com/eigen-space/codestyle/tree/dev/doc/scripts#3111-%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BE-no-implicit-coercion-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9-%D0%BE%D0%B1%D1%91%D1%80%D1%82%D0%BE%D0%BA'
};

accessSpreadsheet();

async function accessSpreadsheet() {
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    const doc = new googleSpreadsheet(SPREADSHEET_ID);
    // Authenticate with the Google Spreadsheets API.
    await promisify(doc.useServiceAccountAuth.bind(doc), creds);
    // Get info about worksheets
    const info = await promisify(doc.getInfo);
    const sheet = info.worksheets[0];

    const rows = await promisify(sheet.getRows);
    console.log('Title:', sheet.title, 'rows: ', rows.length);

    // await removeAllRows(rows);

    const cells = await promisify(sheet.getCells, {
        'min-row': 2,
        'max-row': 150,
        'max-col': 7,
        'min-col': 1,
        'return-empty': true
    });
    // console.log('cells:', cells);

    const rules = getRulesData();

    rules.forEach((rule, i) => {
        cells[7 * i].value = rule._id;
        cells[7 * i + 1].value = rule.name;
        cells[7 * i + 2].value = rule.status;
        cells[7 * i + 3].value = rule.rule;
        cells[7 * i + 4].value = rule.localized;
        cells[7 * i + 5].value = rule.violations;
        cells[7 * i + 6].value = rule.link;
    });

    sheet.bulkUpdateCells(cells);

    // rules.forEach(rule => {
    //     sheet.addRow(rule, err => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // });
}

function promisify(method, ...args) {
    return new Promise((resolve, reject) => {
        method(...args, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function removeAllRows(rows) {
    return Promise.all(rows.map(row => row.del()));
}

function getRulesData() {
    const doc = fs.readFileSync(`${PATH_TO_DOCS}/scripts/README.ru.md`, 'utf8');
    const rules = doc.match(RULE_REGEXP);

    return rules.map((rule, i) => {
        RULE_REGEXP.lastIndex = 0;
        const execResult = RULE_REGEXP.exec(rule);

        const _id = execResult[3] || execResult[4];
        const status = execResult[5];
        const ruleName = execResult[9].slice(1).trim();
        const name = execResult[10];

        return {
            _id,
            name,
            status,
            rule: ruleName,
            localized: 'No',
            violations: 'None',
            link: 'link'
        };
    });
}