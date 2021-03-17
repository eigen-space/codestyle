const a = 1;
const b = '1';

// Плохо
a == b; // Вернёт true

// Хорошо
a === b; // Вернёт false

const x = 15;
const arr = [15];

x > 1;
x > 1 && x < 10;
arr.length > 5;

// Хорошо
1 < x;
1 < x && x < 10;
5 < arr.length;

enum BusinessCommon {
    ES_EXEC
}

const trip = {};

if (BusinessCommon.ES_EXEC !== trip.state) {
}

if (trip.state !== BusinessCommon.ES_EXEC) {
}

function someAction() {
}

// Плохо
if (trip.disabled) {
    if (trip.hasOrders) {
        someAction();
    }
}

// Хорошо
if (trip.disabled && trip.hasOrders) {
    someAction();
}

// Плохо
if (!(a && b)) {
    if (a < b && x < a) {
    }
}

// Хорошо
if (!a || !b) {
    if (a < b && x < a) {
    }
}

// Плохо
if (a) {
    const result = someAction();
} else {
    const result2 = 'someValue';
}

// Хорошо
if (a) {
    const result = someAction();
}

// Плохо
trip.attributes = trip.attributes ? trip.attributes : [];

// Хорошо
trip.attributes = trip.attributes || [];

// Capitalized comment
// not capitalized comment

// Check correct parsing this js feature
const comparison = a ?? 2;