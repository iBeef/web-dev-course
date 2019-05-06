function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}

Vehicle.prototype.turnOn = function() {
    this.isRunning = true;
}

Vehicle.prototype.turnOff = function() {
    this.isRunning = false;
}

Vehicle.prototype.honk = function() {
    if(this.isRunning) {
        return 'beep';
    }
}

var celica = new Vehicle('Toyota', 'Celica', '2005');
var mazda3 = new Vehicle('Mazda', '3', '2019');

console.log('celica: ' + celica.honk());
console.log('mazda3: ' + mazda3.honk());
celica.turnOn();
console.log('celica: ' + celica.honk());
console.log('mazda3: ' + mazda3.honk());
mazda3.turnOn();
console.log('celica: ' + celica.honk());
console.log('mazda3: ' + mazda3.honk());
celica.turnOff();
console.log('celica: ' + celica.honk());
console.log('mazda3: ' + mazda3.honk());
mazda3.turnOff();
console.log('celica: ' + celica.honk());
console.log('mazda3: ' + mazda3.honk());