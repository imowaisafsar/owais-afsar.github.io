

let arrayOfArrayEmpty = [[]]
console.log(arrayOfArrayEmpty)

let arrayOfArray = [[1,2,3,4],[1,0,1,2],[2,0,2,1]]  // 1012 2101
// console.log(arrayOfArray)

arrayOfArray.forEach(element => {
    document.write(element + "<br>")
});
document.write('<br>')

for (let index = 1; index <= 10; index++) {
    document.write(index + '<br>')
}
document.write('<br>')

let fruitsArray = ['apple', 'mango', 'banana', 'orange', 'watermelon'];

function printFruits() {
    for (let index = 0; index < fruitsArray.length; index++) {
        const element = fruitsArray[index];
        document.write(element + '<br>')
    }
    for (let index = 0; index < fruitsArray.length; index++) {
        const element = fruitsArray[index];
        document.write(`Element at inder ${index} is ${element} <br>`)
    }
}
printFruits()
document.write('<br>')

function generateSeries() {
    for (let i = 1; i <= 15; i++) {
        document.write(i + ',')
    }
    document.write('<br>')
    for (let index = 10; index >= 1; index--) {
        document.write(index + ',')
    }
    document.write('<br>')
    for (let index = 1; index <= 20; index++) {
        if(index%2 == 0){
            document.write(index + ',')
        }
    }
    document.write('<br>')
    for (let index = 1; index <= 20; index++) {
        if(index%2 == 1){
            document.write(index + ',')
        }
    }
    document.write('<br>')
    for (let index = 1; index <= 20; index++) {
        if(index%2 == 0){
            document.write(index + 'k, ')
        }
    }
}
generateSeries()
document.write('<br>')
document.write('<br>')

// let fruitsArray = ['apple', 'mango', 'banana', 'orange', 'watermelon'];

let input = prompt('Enter any fruit name');

let available = true;
for (let index = 0; index < fruitsArray.length; index++) {
    const element = fruitsArray[index];
    if (input.toLowerCase() === element.toLowerCase()) {
        document.write(`${element} is <b>available</b>.`)
        available = true;
        break
    } else {
        available = false;
    }
}
if (!available) {
    document.write(`Nothing is <b>available</b>.`)
}
document.write('<br>')
document.write('<br>')

function findLarge() {
    let numbers = [34, 1, 78, 31, 8, 1, 65, 98, 32, 11, 33, 21, 32, 67, 766, 96, 234, 567, 87, 564, 86, 23, 978, 45, 345]
    let maxNum;
    for (let index = 0; index < numbers.length; index++) {
        const element = numbers[index];
        if (maxNum) {
            if (maxNum < element)
                maxNum = element
        }
        else {
            maxNum = element
        }
    }
    //console.log(maxNum)
    document.write(`Numbers array is ${numbers}`)
    document.write('<br>')
    document.write(`Largest number array is ${maxNum}`)
}
findLarge()
document.write('<br>')
document.write('<br>')

function findSmall() {
    let numbers = [34, 1, 78, 31, 8, 1, 65, 98, 32, 11, 33, 21, 32, 67, 766, 96, 234, 567, 87, 564, 86, 23, 978, 45, 345]
    let maxNum;
    for (let index = 0; index < numbers.length; index++) {
        const element = numbers[index];
        if (maxNum) {
            if (maxNum > element)
                maxNum = element
        }
        else {
            maxNum = element
        }
    }
    //console.log(maxNum)
    document.write(`Numbers array is ${numbers}`)
    document.write('<br>')
    document.write(`Smallest number array is ${maxNum}`)
}
findSmall()
document.write('<br>')
document.write('<br>')

for (let index = 1; index <= 30; index++) {
    const element = 5 * index
    document.write(element + ', ')
    if(element === 100){
        break
    }
}


