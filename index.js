/**
 * Add missing date's key value : New value will be average of previous and next date value.
 *
 * @param dictionary : input
 */
function updateDictionary(dictionary) {
    const newDictionary = {}; // new dictionary
    let lastKey = undefined, lastValue = undefined;
    for (const [key, value] of Object.entries(dictionary)) {
        if (lastKey !== key) {
            const days = getDays(lastKey, key);
            if (days > 1) {
                const avg = (value - lastValue) / days;
                for (let count = 1; count < days; count++) {
                    const date = nextDate(lastKey, count);
                    newDictionary[`${date}`] = lastValue + (count * avg);
                }
            }
            newDictionary[`${key}`] = value;
            lastKey = key;
            lastValue = value;
        }
    }
    return newDictionary;
}

/**
 * Count number of days between start and end date
 *
 * @param start : start date
 * @param end : end date
 * @returns {number} : Number of days
 */
function getDays(start, end) {
    if (!start || !end) {
        return 0;
    }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const first = start.split('-');
    const second = end.split('-');
    const firstDate = new Date(first[0], first[1] - 1, first[2]);
    const secondDate = new Date(second[0], second[1] - 1, second[2]);

    return Math.round(Math.abs((secondDate - firstDate) / oneDay));
}

/**
 * Return next date after the given date and count
 *
 * @param date : Given date
 * @param days : Days to add
 * @returns {string} : New string date
 */
function nextDate(date, days) {
    if (!date) {
        return;
    }
    let currentDate = date.split('-');
    currentDate = new Date(currentDate[0], currentDate[1] - 1, currentDate[2]);
    currentDate.setDate(currentDate.getDate() + days);
    return `${currentDate.getFullYear()}-${addPrefix(currentDate.getMonth() + 1, '0', 10)}-${addPrefix(currentDate.getDate(), '0', 10)}`;
}

/**
 * Add prefix to given number if number if lesser than the comparator
 *
 * @param number : Given Number
 * @param prefix : Prefix to add
 * @param comparator : Number to compare
 * @returns {*}
 */
function addPrefix(number, prefix, comparator) {
    if (number < comparator) {
        return `${prefix}${number}`;
    }
    return number;
}

const inputs = process.argv.slice(2);
if (inputs && inputs.length > 0) {
    console.log(JSON.stringify(updateDictionary(JSON.parse(inputs[0]))));
}
exports.updateDictionary = updateDictionary;
