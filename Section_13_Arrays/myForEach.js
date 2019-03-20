function myForEach(arr, func) {
    // Loop thorugh array
    for (var i = 0; i < arr.length; i++) {
        // Call func on each item in the for loop
        func(arr[i]);
    }
}

//  this is the same as self in python. It allows the object to refer to itself.
Array.prototype.myForEach = function(func) {
    // Loop thorugh array
    for (var i = 0; i < this.length; i++) {
        // Call func on each item in the for loop
        func(this[i]);
    }
}