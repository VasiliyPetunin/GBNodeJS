import colors from 'colors';

const nums = process.argv.slice(2);
const num1 = +nums[0];
const num2 = +nums[1];
let startNum = 0;
let endNum = 0;
let isPrimeNums = false;
let countOfPrimeNums = 0;

if (isNaN(num1) || isNaN(num2)) {
    throw new Error('ENTER A NUMBER!!!')
}

const isPrime = (num) => {
    if (num >= 2) { // если число меньше двух, то оно не является простым
        for(let j = 2; j < num; j++)  {
            if(num % j === 0) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const showInConsole = (primeNum) => {
    switch (countOfPrimeNums) {
        case 1:
            console.log(colors.green(primeNum));
            break;
        case 2:
            console.log(colors.yellow(primeNum));
            break;
        case 3:
            console.log(colors.red(primeNum));
            break;
    }
    if(countOfPrimeNums === 3) {
        countOfPrimeNums = 0;
    }
}

if (num1 < num2) {
    startNum = num1;
    endNum = num2;
}   else {
    startNum = num2;
    endNum = num1;
}

for (let i = startNum; i <= endNum; i++) {
    if (isPrime(i)) {
        isPrimeNums = true;
        countOfPrimeNums++;
        showInConsole(i);
    }
}

if (!isPrimeNums) {
    console.log(colors.red('No prime numbers in this range'));
}
