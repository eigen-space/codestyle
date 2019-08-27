// Плохо
const condition = 1234;
let result;

function doSomeCalculation(): void {
}

if (condition) {
    result = doSomeCalculation();
} else {
    result = 'someValue';
}

// Хорошо
result = 'someValue';
if (condition) {
    result = doSomeCalculation();
}