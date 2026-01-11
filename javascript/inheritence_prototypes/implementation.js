// 1. Basic prototype example
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return 'Hello, I am ' + this.name;
};

const john = new Person('John', 25);
const jane = new Person('Jane', 30);

// console.log(john.greet()); // Hello, I am John
// console.log(jane.greet()); // Hello, I am Jane
// console.log(john.greet === jane.greet); // true - same method

// 2. Checking prototype
// console.log(Object.getPrototypeOf(john) === Person.prototype); // true
// console.log(john.__proto__ === Person.prototype); // true (same thing)

// 3. hasOwnProperty vs prototype properties
const user = { name: 'Alice' };

// console.log(user.hasOwnProperty('name'));     // true - own property
// console.log(user.hasOwnProperty('toString')); // false - from prototype
// console.log(user.toString()); // [object Object] - still works

// 4. Constructor functions with methods
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

Car.prototype.getInfo = function() {
  return this.brand + ' ' + this.model;
};

Car.prototype.drive = function() {
  return this.brand + ' is driving';
};

const toyota = new Car('Toyota', 'Camry');
const honda = new Car('Honda', 'Civic');

// console.log(toyota.getInfo()); // Toyota Camry
// console.log(honda.drive());    // Honda is driving

// 5. Prototype chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return this.name + ' is eating';
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return this.name + ' says woof!';
};

const rex = new Dog('Rex', 'Labrador');

// console.log(rex.bark());  // Rex says woof! - from Dog.prototype
// console.log(rex.eat());   // Rex is eating - from Animal.prototype
// console.log(rex.breed);   // Labrador - own property

// 6. instanceof operator
// console.log(rex instanceof Dog);    // true
// console.log(rex instanceof Animal); // true
// console.log(rex instanceof Object); // true

// 7. Object.create() method
const personPrototype = {
  greet: function() {
    return 'Hello, I am ' + this.name;
  },
  introduce: function() {
    return 'My name is ' + this.name + ' and I am ' + this.age;
  }
};

const bob = Object.create(personPrototype);
bob.name = 'Bob';
bob.age = 28;

// console.log(bob.greet());     // Hello, I am Bob
// console.log(bob.introduce()); // My name is Bob and I am 28

// 8. Class syntax (syntactic sugar)
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return 'Hello, I am ' + this.name;
  }
  
  getAge() {
    return this.age;
  }
}

const alice = new PersonClass('Alice', 25);
// console.log(alice.greet());  // Hello, I am Alice
// console.log(alice.getAge()); // 25

// 9. Class inheritance with extends
class Employee extends PersonClass {
  constructor(name, age, position) {
    super(name, age); // Call parent constructor
    this.position = position;
  }
  
  work() {
    return this.name + ' is working as a ' + this.position;
  }
  
  // Override parent method
  greet() {
    return 'Hello, I am ' + this.name + ', a ' + this.position;
  }
}

const developer = new Employee('Charlie', 30, 'Developer');
// console.log(developer.work());   // Charlie is working as a Developer
// console.log(developer.greet());  // Hello, I am Charlie, a Developer
// console.log(developer.getAge()); // 30 - inherited from parent

// 10. Checking the prototype chain
// console.log(developer instanceof Employee);    // true
// console.log(developer instanceof PersonClass); // true
// console.log(developer instanceof Object);      // true

// 11. Method sharing efficiency
function Counter(start) {
  this.count = start || 0;
}

Counter.prototype.increment = function() {
  this.count++;
  return this.count;
};

Counter.prototype.decrement = function() {
  this.count--;
  return this.count;
};

const counter1 = new Counter(0);
const counter2 = new Counter(10);

// console.log(counter1.increment()); // 1
// console.log(counter2.increment()); // 11
// console.log(counter1.increment === counter2.increment); // true - shared

// 12. Property delegation
const defaults = {
  theme: 'light',
  fontSize: 14,
  language: 'en'
};

const userSettings = Object.create(defaults);
userSettings.theme = 'dark'; // Override

// console.log(userSettings.theme);    // 'dark' - own property
// console.log(userSettings.fontSize); // 14 - from prototype
// console.log(userSettings.language); // 'en' - from prototype

// 13. Mixin pattern
const canEat = {
  eat: function() {
    return this.name + ' is eating';
  }
};

const canWalk = {
  walk: function() {
    return this.name + ' is walking';
  }
};

const canSwim = {
  swim: function() {
    return this.name + ' is swimming';
  }
};

function Human(name) {
  this.name = name;
}

// Add multiple mixins
Object.assign(Human.prototype, canEat, canWalk, canSwim);

const david = new Human('David');
// console.log(david.eat());  // David is eating
// console.log(david.walk()); // David is walking
// console.log(david.swim()); // David is swimming

// 14. Constructor property
function Product(name) {
  this.name = name;
}

const laptop = new Product('Laptop');
// console.log(laptop.constructor === Product); // true
// console.log(laptop.constructor.name); // 'Product'

// 15. Resetting constructor after inheritance
function Vehicle(type) {
  this.type = type;
}

function Bike(type, brand) {
  Vehicle.call(this, type);
  this.brand = brand;
}

Bike.prototype = Object.create(Vehicle.prototype);
// Without this line, constructor would be Vehicle
Bike.prototype.constructor = Bike;

const bike = new Bike('Mountain', 'Trek');
// console.log(bike.constructor === Bike); // true
// console.log(bike.constructor.name); // 'Bike'

// 16. Shadowing prototype properties
function Settings() {
  // Empty constructor
}

Settings.prototype.theme = 'light';

const settings1 = new Settings();
const settings2 = new Settings();

settings1.theme = 'dark'; // Creates own property

// console.log(settings1.theme); // 'dark' - own property
// console.log(settings2.theme); // 'light' - from prototype

// 17. Real-world: Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
  
  getDetails() {
    return 'Validation failed for field: ' + this.field;
  }
}

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }
  return true;
}

// try {
//   validateEmail('invalid');
// } catch (error) {
//   if (error instanceof ValidationError) {
//     console.log(error.getDetails());
//   }
// }

// 18. Real-world: Data model base class
class Model {
  constructor(data) {
    Object.assign(this, data);
    this.createdAt = Date.now();
  }
  
  save() {
    console.log('Saving:', this);
    return this;
  }
  
  delete() {
    console.log('Deleting:', this);
    return this;
  }
  
  toJSON() {
    return JSON.stringify(this);
  }
}

class UserModel extends Model {
  constructor(data) {
    super(data);
    this.type = 'user';
  }
  
  login() {
    console.log(this.name + ' logged in');
    return this;
  }
  
  logout() {
    console.log(this.name + ' logged out');
    return this;
  }
}

const userModel = new UserModel({ name: 'Emma', email: 'emma@example.com' });
// userModel.save().login();

// 19. Real-world: Plugin system
class Plugin {
  constructor(name) {
    this.name = name;
    this.enabled = false;
  }
  
  enable() {
    this.enabled = true;
    console.log(this.name + ' enabled');
  }
  
  disable() {
    this.enabled = false;
    console.log(this.name + ' disabled');
  }
}

class ThemePlugin extends Plugin {
  constructor(theme) {
    super('Theme Plugin');
    this.theme = theme;
  }
  
  applyTheme() {
    console.log('Applying theme:', this.theme);
  }
}

class NotificationPlugin extends Plugin {
  constructor() {
    super('Notification Plugin');
  }
  
  notify(message) {
    if (this.enabled) {
      console.log('Notification:', message);
    }
  }
}

const themePlugin = new ThemePlugin('dark');
const notifPlugin = new NotificationPlugin();

// themePlugin.enable();
// themePlugin.applyTheme();
// notifPlugin.enable();
// notifPlugin.notify('Hello!');

// 20. Checking property location
function checkProperty(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    return 'Own property';
  } else if (prop in obj) {
    return 'Inherited property';
  } else {
    return 'Property not found';
  }
}

const testObj = { name: 'Test' };
// console.log(checkProperty(testObj, 'name'));     // Own property
// console.log(checkProperty(testObj, 'toString')); // Inherited property
// console.log(checkProperty(testObj, 'unknown')); // Property not found

// 21. Method override in inheritance
class Shape {
  constructor(type) {
    this.type = type;
  }
  
  area() {
    return 0;
  }
  
  describe() {
    return 'This is a ' + this.type;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('rectangle');
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// console.log(circle.describe());      // This is a circle
// console.log(circle.area());          // ~78.54
// console.log(rectangle.describe());   // This is a rectangle
// console.log(rectangle.area());       // 24

// 22. Static methods (belong to class, not instances)
class MathUtils {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

// console.log(MathUtils.add(5, 3));      // 8
// console.log(MathUtils.multiply(4, 7)); // 28

// 23. Private fields (modern JavaScript)
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return this.#balance;
    }
    return 'Insufficient funds';
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
// console.log(account.deposit(500));   // 1500
// console.log(account.withdraw(200));  // 1300
// console.log(account.getBalance());   // 1300
// console.log(account.#balance);       // Error - private field

// 24. Getters and setters
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }
  
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    this._celsius = value;
  }
}

const temp = new Temperature(25);
// console.log(temp.celsius);    // 25
// console.log(temp.fahrenheit); // 77
// temp.fahrenheit = 86;
// console.log(temp.celsius);    // 30

// 25. Factory pattern with prototypes
function createAnimal(type, name) {
  const animal = Object.create({
    speak: function() {
      return this.name + ' makes a sound';
    },
    eat: function() {
      return this.name + ' is eating';
    }
  });
  
  animal.type = type;
  animal.name = name;
  
  return animal;
}

const cat = createAnimal('cat', 'Whiskers');
const dogAnimal = createAnimal('dog', 'Buddy');

// console.log(cat.speak());       // Whiskers makes a sound
// console.log(dogAnimal.eat());   // Buddy is eating

console.log('\n Prototypes & Inheritance Examples');
console.log('Uncomment to see the output\n');