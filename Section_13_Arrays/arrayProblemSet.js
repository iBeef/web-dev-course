function printReverse(newArray) {
    for (var i = newArray.length - 1; i >= 0; i--) {
        console.log(newArray[i]);
        return newArray[i];
    }
}

printReverse([1, 2, 3, 4]);
printReverse(['a', 'b', 'c']);

function isUniform(uniformArray) {
    var reference = uniformArray[0];
    var uniformBool = true;
    uniformArray.forEach(function(listItem) {
        if (listItem !== reference) {
            uniformBool = false;
        }
    });
    console.log(uniformBool);
    return uniformBool;
}

isUniform([1, 1, 1, 1]);
isUniform([2, 1, 1, 1]);
isUniform(['a', 'b', 'c']);
isUniform(['a', 'a', 'a']);

function sumArray (numArray) {
    var result = 0;
    numArray.forEach(function(num) {
        result += num;
    })
    console.log(result);
    return result;
}

sumArray([1, 2, 3])
sumArray([10, 3, 10, 4])
sumArray([-5, 100])

function max(maxArray) {
    var max = maxArray[0];
    for (var i = 1; i < maxArray.length; i++) {
        if (maxArray[i] > max) {
            max = maxArray[i];
        }
    }
    console.log(max);
    return max;
}

max([1, 2, 3])
max([10, 3, 10, 4])
max([-5, 100])