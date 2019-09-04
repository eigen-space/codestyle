const path = require('path');
const fs = require('fs');
const os = require('os');
const googleSpreadsheet = require('google-spreadsheet');
const creds = require('../credentials/google-sheets-credentials.json');
const { walkThrough } = require('@eigenspace/helper-scripts');

// The Google Sheet ID found in the URL of your Google Sheet.
const SPREADSHEET_ID = '1phevI9VxclD8QsHYr5Stu-nlvUjJ3taBujgu1JOUqlg';

const PATH_TO_DOCS = '../../doc';
const FILE_NAME = 'README.ru.md';

const StatusType = {
    AUTOMATED: 'Автоматизировано',
    NON_AUTOMATED: 'Не автоматизировано',
    PARTLY_AUTOMATED: 'Частично автоматизировано'
};

const ID_REGEXP = /(([#]+ ([\d+.]+))|(\w\.))/.toString().slice(1, -1);
const STATUS_REGEXP = Object.values(StatusType).map(statusType => `(${statusType})`).join('|');
const END_REGEXP = new RegExp(`(${os.EOL}.+)*`).toString().slice(1, -1);

const RULE_REGEXP = new RegExp(`${ID_REGEXP} \\\\\\[(${STATUS_REGEXP})(.*)\\\\\\] (.+${END_REGEXP})`, 'gm');

const COLUMNS_COUNT = 7;

accessSpreadsheet();

async function accessSpreadsheet() {
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    const doc = new googleSpreadsheet(SPREADSHEET_ID);
    // Authenticate with the Google Spreadsheets API.
    await promisify(doc.useServiceAccountAuth.bind(doc), creds);
    // Get info about worksheets
    const info = await promisify(doc.getInfo);

    const sheets = info.worksheets;
    walkThrough(PATH_TO_DOCS, async (dir, file) => {
        if (file !== FILE_NAME) {
            return;
        }

        const docType = dir.split(path.sep).pop();
        const sheet = sheets.find(worksheet => worksheet.title === docType);

        await removeAllRows(sheet);

        const rules = getRulesData(path.join(dir, file));
        addRows(sheet, rules);
    });
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

async function getCellsTillRow(sheet, maxRow) {
    return promisify(sheet.getCells, {
        'min-row': 2,
        'max-row': maxRow + 1,
        'max-col': COLUMNS_COUNT,
        'min-col': 1,
        'return-empty': true
    });
}

async function removeAllRows(sheet) {
    const rows = await promisify(sheet.getRows);
    const cells = await getCellsTillRow(sheet, rows.length);

    // Assignment through index because of no-param-reassign eslint rule
    cells.forEach(({}, i) => cells[i].value = null);
    return sheet.bulkUpdateCells(cells);
}

async function addRows(sheet, rules) {
    const cells = await getCellsTillRow(sheet, rules.length);

    rules.forEach((rule, i) => {
        const rowValues = [rule._id, rule.name, rule.status, rule.rule, rule.localized, rule.violations, rule.link];

        rowValues.forEach((ruleValue, j) => {
            const cellIndex = i * rowValues.length + j;
            cells[cellIndex].value = ruleValue;
        });
    });

    return sheet.bulkUpdateCells(cells);
}

function getRulesData(pathToDoc) {
    const doc = fs.readFileSync(pathToDoc, 'utf8');
    const rules = doc.match(RULE_REGEXP);

    if (!rules) {
        return [];
    }

    return rules.map(rule => {
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