// psudo code but its really js


function hammingDistance(str1: string, str2: string) {
    // str1 = "foo";
    // str2 = "bar";
    var distance = 0;

    let str1Arr = str1.split("");
    let str2Arr = str2.split("");
    // str1Arr = ['f', 'o', 'o']
    // str2Arr = ['b', 'a', 'r']


    // check if the strings are of equal length
    if (str1Arr.length !== str2Arr.length) {throw new Error("Strings must be of equal length")}


    // iterate through each character in the strings
    for (let i = 0; i < str1Arr.length; i++) {
        // convert each character to binary
        let binArr1 = stringToBinary(str1Arr[i]);
        let binArr2 = stringToBinary(str2Arr[i]);
        // binArr1 = '01100110'
        // binArr2 = '01100010'

        // interate through each bit in the binary strings
        for (let j = 0; j < binArr1.length; j++) {
            // check if the bits are different
            if (binArr1[j] !== binArr2[j]) {
                // increment the distance if the bits are different
                distance++;
            }
        }
    }
    return distance;
}

function stringToBinary(str: string) {
    let binaryString = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const binaryChar = charCode.toString(2).padStart(8, '0');
        binaryString += binaryChar;
    }
    return binaryString;
}

// testing my algorithm
const str1 = "foo";
const str2 = "bar";
const distance1 = hammingDistance(str1, str2);

const str3 = "560000000000124";
const str4 = "169807802340342";
const distance2 = hammingDistance(str3, str4);

console.log('------------------');
console.log('Example 1 - Output should be 8');
console.log(`The Hamming distance between "${str1}" and "${str2}" is ${distance1}.`);
console.log('Example 2 - Output should be 17');
console.log(`The Hamming distance between "${str3}" and "${str4}" is ${distance2}.`);