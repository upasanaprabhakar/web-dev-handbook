// 1. Basic this in different contexts
function regularFunction() {
  console.log('Regular function this:', this);
}

// regularFunction(); // Window/global object (or undefined in strict mode)

// 2. this in object methods
const person = {
  name: 'John',
  age: 25,
  greet: function() {
    console.log('Hello, my name is ' + this.name);
  },
  getAge: function() {
    return this.age;
  }
};

// person.greet(); // Hello, my name is John
// console.log(person.getAge()); // 25

// 3. Losing this context
const greetFunction = person.greet;
// greetFunction(); // Error: this.name is undefined

// 4. Arrow functions don't have their own this
const personWithArrow = {
  name: 'Jane',
  greet: () => {
    console.log('Hello, ' + this.name); // Won't work as expected
  },
  greetCorrect: function() {
    console.log('Hello, ' + this.name); // Works correctly
  }
};

// personWithArrow.greet(); // Hello, undefined
// personWithArrow.greetCorrect(); // Hello, Jane

// 5. Arrow functions in callbacks (good use case)
const user = {
  name: 'Bob',
  hobbies: ['reading', 'gaming', 'coding'],
  showHobbies: function() {
    this.hobbies.forEach(hobby => {
      console.log(this.name + ' likes ' + hobby);
    });
  },
  showHobbiesWrong: function() {
    this.hobbies.forEach(function(hobby) {
      // console.log(this.name + ' likes ' + hobby); // Error: this.name undefined
    });
  }
};

// user.showHobbies(); // Works with arrow function

// 6. Using bind() to fix this
const car = {
  brand: 'Toyota',
  model: 'Camry',
  getInfo: function() {
    return this.brand + ' ' + this.model;
  }
};

const getCarInfo = car.getInfo.bind(car);
// console.log(getCarInfo()); // Toyota Camry

// 7. call() method
function introduce(greeting, punctuation) {
  console.log(greeting + ', I am ' + this.name + punctuation);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Charlie' };

// introduce.call(person1, 'Hello', '!'); // Hello, I am Alice!
// introduce.call(person2, 'Hi', '.'); // Hi, I am Charlie.

// 8. apply() method (same as call but args as array)
// introduce.apply(person1, ['Hey', '!!!']); // Hey, I am Alice!!!

// 9. Constructor functions
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.introduce = function() {
    console.log('I am ' + this.name + ', ' + this.age + ' years old');
  };
}

const john = new Person('John', 30);
const sarah = new Person('Sarah', 28);

// john.introduce(); // I am John, 30 years old
// sarah.introduce(); // I am Sarah, 28 years old

// 10. this in classes
class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  
  speak() {
    console.log(this.name + ' the ' + this.type + ' makes a sound');
  }
  
  // Arrow function as class property (auto-binds this)
  speakArrow = () => {
    console.log(this.name + ' the ' + this.type + ' makes a sound');
  }
}

const dog = new Animal('Rex', 'dog');
// dog.speak(); // Rex the dog makes a sound

// Method loses context when extracted
const speakFunc = dog.speak;
// speakFunc(); // Error: this is undefined

// Arrow function preserves context
const speakArrowFunc = dog.speakArrow;
// speakArrowFunc(); // Rex the dog makes a sound

// 11. Saving this reference (old pattern)
const timer = {
  seconds: 0,
  start: function() {
    const self = this; // Save reference
    setInterval(function() {
      self.seconds++;
      console.log(self.seconds + ' seconds');
    }, 1000);
  },
  startModern: function() {
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds + ' seconds');
    }, 1000);
  }
};

// timer.startModern(); // Modern way with arrow function

// 12. this in event handlers (simulated)
const button = {
  text: 'Click me',
  handleClick: function() {
    console.log('Button says: ' + this.text);
  },
  handleClickArrow: () => {
    console.log('Button says: ' + this.text); // Won't work
  }
};

// button.handleClick(); // Button says: Click me

// 13. Method borrowing with call
const calculator1 = {
  value: 10,
  add: function(num) {
    return this.value + num;
  }
};

const calculator2 = { value: 20 };

// Borrow calculator1's method for calculator2
// console.log(calculator1.add.call(calculator2, 5)); // 25

// 14. Chaining methods with this
const counter = {
  count: 0,
  increment: function() {
    this.count++;
    return this; // Return this for chaining
  },
  decrement: function() {
    this.count--;
    return this;
  },
  show: function() {
    console.log('Count:', this.count);
    return this;
  }
};

// counter.increment().increment().decrement().show(); // Count: 1

// 15. Real-world: Building a shopping cart
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }
  
  addItem(item, price) {
    this.items.push({ item, price });
    this.total += price;
    return this;
  }
  
  removeItem(item) {
    const index = this.items.findIndex(i => i.item === item);
    if (index !== -1) {
      this.total -= this.items[index].price;
      this.items.splice(index, 1);
    }
    return this;
  }
  
  showCart() {
    console.log('Items:', this.items);
    console.log('Total: $' + this.total);
    return this;
  }
}

const myCart = new ShoppingCart();
// myCart.addItem('Book', 15).addItem('Pen', 2).showCart();

// 16. Real-world: User authentication
class User {
  constructor(username) {
    this.username = username;
    this.isLoggedIn = false;
  }
  
  login() {
    this.isLoggedIn = true;
    console.log(this.username + ' logged in');
    return this;
  }
  
  logout() {
    this.isLoggedIn = false;
    console.log(this.username + ' logged out');
    return this;
  }
  
  getStatus() {
    const status = this.isLoggedIn ? 'online' : 'offline';
    console.log(this.username + ' is ' + status);
    return this;
  }
}

const userAccount = new User('john_doe');
// userAccount.login().getStatus().logout();

// 17. Binding in constructor (React pattern)
class ButtonComponent {
  constructor(label) {
    this.label = label;
    this.clicks = 0;
    
    // Bind methods in constructor
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.clicks++;
    console.log(this.label + ' clicked ' + this.clicks + ' times');
  }
  
  render() {
    return this.handleClick; // Can pass this around safely now
  }
}

const submitButton = new ButtonComponent('Submit');
const clickHandler = submitButton.render();
// clickHandler(); // Submit clicked 1 times
// clickHandler(); // Submit clicked 2 times

// 18. Factory function with this
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    introduce: function() {
      return 'Hi, I am ' + this.name + ' and I am ' + this.age;
    },
    haveBirthday: function() {
      this.age++;
      return this;
    }
  };
}

const alex = createPerson('Alex', 25);
// console.log(alex.introduce()); // Hi, I am Alex and I am 25
// alex.haveBirthday();
// console.log(alex.introduce()); // Hi, I am Alex and I am 26

// 19. this with nested objects
const company = {
  name: 'Tech Corp',
  employee: {
    name: 'Jane',
    greet: function() {
      console.log('I work at ' + this.name); // this = employee object
    }
  }
};

// company.employee.greet(); // I work at Jane (not Tech Corp!)

// 20. Explicit vs implicit binding
const obj = {
  value: 100,
  getValue: function() {
    return this.value;
  }
};

// Implicit binding (this = obj)
// console.log(obj.getValue()); // 100

// Explicit binding with call
const otherObj = { value: 200 };
// console.log(obj.getValue.call(otherObj)); // 200

// 21. this in setTimeout
const data = {
  message: 'Hello',
  showMessage: function() {
    setTimeout(function() {
      // console.log(this.message); // undefined - lost this
    }, 1000);
  },
  showMessageCorrect: function() {
    setTimeout(() => {
      console.log(this.message); // 'Hello' - arrow function preserves this
    }, 1000);
  }
};

// data.showMessageCorrect();

// 22. Real-world: API service class
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cache = {};
  }
  
  async fetchData(endpoint) {
    if (this.cache[endpoint]) {
      console.log('Returning cached data for', endpoint);
      return this.cache[endpoint];
    }
    
    console.log('Fetching from', this.baseUrl + endpoint);
    // Simulate API call
    const data = { endpoint, timestamp: Date.now() };
    this.cache[endpoint] = data;
    return data;
  }
  
  clearCache() {
    this.cache = {};
    console.log('Cache cleared');
    return this;
  }
}

const api = new ApiService('https://api.example.com/');
// api.fetchData('/users').then(data => console.log(data));

console.log('\n=== this Keyword Examples ===');
console.log('Uncomment any line to see the output\n');