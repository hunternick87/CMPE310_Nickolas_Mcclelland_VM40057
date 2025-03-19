const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// settings
const MAX_TESTS = 50;       // maximum number of tests
const MAX_INT = 200;        // ints are between 0 and MAX_INT
const MAX_INT_COUNT = 300;  // total number of integers in a test file
const FOLDER = 'tests';     // folder to store the test files

// check the user input
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node tester.js <number_of_tests> <program_name>');
    process.exit(1);
}

const testCount = parseInt(args[0], 10);
const programName = args[1];

// validate the user input
if (isNaN(testCount) || testCount <= 0) {
    console.error('Please provide a valid positive integer for the number of tests.');
    process.exit(1);
}

if (testCount > MAX_TESTS) {
    console.error(`Please provide a number of tests less than or equal to ${MAX_TESTS}.`);
    process.exit(1);
}

// make the testing folder
fs.mkdirSync(FOLDER, { recursive: true });

let testArr = [];

for (let i = 0; i < testCount; i++) {
    const numInts = Math.floor(Math.random() * MAX_INT_COUNT) + 1;
    // always put 290 integers
    //const numInts = 290;
    const fileName = `test_${i}.txt`;
    testArr.push({ numInts, fileName });
}

for (const test of testArr) {
    const randomInts = Array.from({ length: test.numInts }, () => Math.floor(Math.random() * (MAX_INT + 1)));
    test.sum = randomInts.reduce((a, b) => a + b, 0);

    // write to the file
    // first line is the number of integers, then its the integers
    const filePath = path.join(__dirname, FOLDER, test.fileName);
    const fileContent = [test.numInts, ...randomInts].join('\n'); // first line is numInts, then the integers
    fs.writeFileSync(filePath, fileContent, 'utf8');
}

console.log(`Created ${testCount} test files in the '${FOLDER}' folder.`);

let passedTests = 0;

// run the tests on the program
for (const test of testArr) {
    const filePath = path.join(__dirname, FOLDER, test.fileName);
    try {
        const output = execSync(`./${programName} ${filePath}`).toString().trim();
        const outputSum = parseInt(output, 10);

        if (outputSum === test.sum) {
            console.log(`Test ${test.fileName}: PASSED | Sum: ${outputSum} | Expected: ${test.sum}`);
            passedTests++;
        } else {
            console.log(`Test ${test.fileName}: FAILED | Sum: ${outputSum} | Expected: ${test.sum}`);
        }
    } catch (error) {
        console.error(`Test ${test.fileName}: ERROR | ${error.message}`);
    }
}

// cleanup
fs.rmSync(FOLDER, { recursive: true, force: true });

console.log('----------------------------------------');
console.log('All tests completed.');
console.log(`Tests passed: ${passedTests}/${testCount}`);

