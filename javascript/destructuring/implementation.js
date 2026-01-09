// 1. Basic Array Destructuring
const colors = ['red', 'green', 'blue'];
const [firstColor, secondColor, thirdColor] = colors;
// console.log(firstColor); // red
// console.log(secondColor); // green

// 2. Skipping elements in array
const numbers = [1, 2, 3, 4, 5];
const [first, , third, , fifth] = numbers;
// console.log(first, third, fifth); // 1 3 5

// 3. Rest operator in array destructuring
const fruits = ['apple', 'banana', 'orange', 'mango', 'grape'];
const [firstFruit, secondFruit, ...restFruits] = fruits;
// console.log(firstFruit); // apple
// console.log(secondFruit); // banana
// console.log(restFruits); // ['orange', 'mango', 'grape']

// 4. Default values in array destructuring
const [a = 1, b = 2, c = 3] = [10, 20];
// console.log(a, b, c); // 10 20 3

// 5. Swapping variables
let x = 5;
let y = 10;
[x, y] = [y, x];
// console.log(x, y); // 10 5

// 6. Basic Object Destructuring
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// const { name, age, city } = person;
// console.log(name); // John
// console.log(age); // 30

// 7. Renaming variables during destructuring
const user = {
  username: 'john_doe',
  email: 'john@example.com'
};

const { username: userName, email: userEmail } = user;
// console.log(userName); // john_doe
// console.log(userEmail); // john@example.com

// 8. Default values in object destructuring
const settings = {
  theme: 'dark'
};

// const { theme, fontSize = 16, language = 'en' } = settings;
// console.log(theme); // dark
// console.log(fontSize); // 16
// console.log(language); // en

// 9. Nested object destructuring
const employee = {
  id: 101,
  personalInfo: {
    firstName: 'Alice',
    lastName: 'Smith',
    address: {
      street: '123 Main St',
      city: 'Boston',
      zip: '02101'
    }
  }
};

// const {
//   personalInfo: {
//     firstName,
//     lastName,
//     address: { city: employeeCity, zip }
//   }
// } = employee;

// console.log(firstName); // Alice
// console.log(employeeCity); // Boston
// console.log(zip); // 02101

// 10. Rest operator in object destructuring
const product = {
  id: 1,
  name: 'Laptop',
  price: 999,
  category: 'Electronics',
  inStock: true
};

// const { id, name, ...productDetails } = product;
// console.log(id, name); // 1 Laptop
// console.log(productDetails); // { price: 999, category: 'Electronics', inStock: true }

// 11. Destructuring in function parameters
function displayUser({ name, age, country = 'USA' }) {
  console.log(`${name} is ${age} years old from ${country}`);
}

// displayUser({ name: 'Bob', age: 25 }); // Bob is 25 years old from USA

// 12. Array destructuring in function parameters
function getCoordinates([x, y, z = 0]) {
  console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}

// getCoordinates([10, 20]); // X: 10, Y: 20, Z: 0

// 13. Destructuring function return values (array)
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}

// const [min, max] = getMinMax([5, 2, 9, 1, 7]);
// console.log(min, max); // 1 9

// 14. Destructuring function return values (object)
function getUserInfo() {
  return {
    username: 'jane_doe',
    role: 'admin',
    isActive: true
  };
}

// const { username, role, isActive } = getUserInfo();
// console.log(username, role); // jane_doe admin

// 15. Combining array and object destructuring
const students = [
  { name: 'Tom', grade: 85 },
  { name: 'Sara', grade: 92 },
  { name: 'Mike', grade: 78 }
];

// const [{ name: student1Name, grade: grade1 }, { name: student2Name }] = students;
// console.log(student1Name, grade1); // Tom 85
// console.log(student2Name); // Sara

// 16. Destructuring in loops
const users = [
  { id: 1, name: 'Alice', status: 'active' },
  { id: 2, name: 'Bob', status: 'inactive' },
  { id: 3, name: 'Charlie', status: 'active' }
];

for (const { name, status } of users) {
  // console.log(`${name} is ${status}`);
}

// 17. Mixed destructuring with nested arrays and objects
const apiResponse = {
  status: 'success',
  data: {
    users: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ],
    count: 2
  }
};

// const {
//   status,
//   data: { users: [firstUser, secondUser], count }
// } = apiResponse;

// console.log(status); // success
// console.log(firstUser); // { id: 1, name: 'John' }
// console.log(count); // 2

// 18. Computed property names in destructuring
const key = 'username';
const userData = {
  username: 'admin',
  password: 'secret123'
};

// const { [key]: userValue } = userData;
// console.log(userValue); // admin

// 19. Real-world: Handling API response
function processApiData(response) {
  const {
    data: { 
      user: { name, email },
      settings: { notifications = true, theme = 'light' } = {}
    } = {}
  } = response;
  
  console.log('User:', name, email);
  console.log('Settings:', notifications, theme);
}

const apiData = {
  data: {
    user: { name: 'Alice', email: 'alice@example.com' },
    settings: { notifications: false }
  }
};

// processApiData(apiData);

// 20. Real-world: React props destructuring pattern
function UserCard({ user: { name, avatar, bio }, theme = 'light' }) {
  return {
    name,
    avatar,
    bio,
    theme
  };
}

const cardData = {
  user: {
    name: 'John Doe',
    avatar: 'avatar.jpg',
    bio: 'Developer'
  }
};

// console.log(UserCard(cardData));

// 21. Destructuring with complex default values
function createConfig({
  host = 'localhost',
  port = 3000,
  options: {
    timeout = 5000,
    retries = 3
  } = {}
} = {}) {
  console.log(`Host: ${host}, Port: ${port}, Timeout: ${timeout}, Retries: ${retries}`);
}

// createConfig(); // Uses all defaults
// createConfig({ host: 'example.com' }); // Partial override
// createConfig({ host: 'example.com', options: { timeout: 10000 } });

// 22. Real-world: Array methods with destructuring
const products = [
  { id: 1, name: 'Phone', price: 699 },
  { id: 2, name: 'Tablet', price: 499 },
  { id: 3, name: 'Laptop', price: 1299 }
];

const productNames = products.map(({ name }) => name);
// console.log(productNames); // ['Phone', 'Tablet', 'Laptop']

const expensiveProducts = products.filter(({ price }) => price > 500);
// console.log(expensiveProducts);

// 23. Real-world: Event handler destructuring
function handleFormSubmit(event) {
  const {
    target: {
      elements: {
        username: { value: usernameValue },
        email: { value: emailValue }
      }
    }
  } = event;
  
  console.log('Username:', usernameValue);
  console.log('Email:', emailValue);
}

// Simulated event object
const mockEvent = {
  target: {
    elements: {
      username: { value: 'john_doe' },
      email: { value: 'john@example.com' }
    }
  }
};

// handleFormSubmit(mockEvent);

// 24. Destructuring with Map and Set
const userMap = new Map([
  ['name', 'Alice'],
  ['age', 28],
  ['role', 'developer']
]);

for (const [key, value] of userMap) {
  // console.log(`${key}: ${value}`);
}

// 25. Real-world: Configuration management
class DatabaseConnection {
  constructor({
    host = 'localhost',
    port = 5432,
    database,
    credentials: { username, password } = {},
    options: { 
      maxConnections = 10,
      timeout = 30000,
      ssl = false 
    } = {}
  }) {
    this.host = host;
    this.port = port;
    this.database = database;
    this.username = username;
    this.password = password;
    this.maxConnections = maxConnections;
    this.timeout = timeout;
    this.ssl = ssl;
  }
  
  getConnectionString() {
    return `${this.username}@${this.host}:${this.port}/${this.database}`;
  }
}

const db = new DatabaseConnection({
  database: 'myapp',
  credentials: { username: 'admin', password: 'secret' },
  options: { ssl: true }
});

// console.log(db.getConnectionString()); // admin@localhost:5432/myapp

// 26. Destructuring with null coalescing
const config = {
  api: {
    endpoint: null
  }
};

const { api: { endpoint = 'https://api.default.com' } = {} } = config;
// console.log(endpoint); // https://api.default.com

// 27. Real-world: Shopping cart implementation
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem({ id, name, price, quantity = 1 }) {
    this.items.push({ id, name, price, quantity });
    return this;
  }
  
  getTotal() {
    return this.items.reduce((sum, { price, quantity }) => {
      return sum + (price * quantity);
    }, 0);
  }
  
  displayItems() {
    this.items.forEach(({ name, price, quantity }) => {
      console.log(`${name} - $${price} x ${quantity}`);
    });
  }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Book', price: 15 })
    .addItem({ id: 2, name: 'Pen', price: 2, quantity: 3 });

// cart.displayItems();
// console.log('Total:', cart.getTotal());

// 28. Destructuring with regular expressions
const emailRegex = /([^@]+)@([^.]+\..+)/;
const email = 'user@example.com';
const [, emailUser, emailDomain] = email.match(emailRegex) || [];
// console.log(emailUser, emailDomain); // user example.com

// 29. Real-world: Error handling with destructuring
function processData(response) {
  const { 
    success, 
    data, 
    error: { message = 'Unknown error', code = 500 } = {} 
  } = response;
  
  if (success) {
    console.log('Data:', data);
  } else {
    console.log(`Error ${code}: ${message}`);
  }
}

// processData({ success: true, data: { result: 'OK' } });
// processData({ success: false, error: { message: 'Not found', code: 404 } });

// 30. Advanced: Dynamic destructuring
function extractFields(obj, ...fields) {
  return fields.reduce((result, field) => {
    const { [field]: value } = obj;
    result[field] = value;
    return result;
  }, {});
}

const fullUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 28,
  city: 'NYC',
  country: 'USA'
};

const extracted = extractFields(fullUser, 'name', 'email', 'city');
// console.log(extracted); // { name: 'Alice', email: 'alice@example.com', city: 'NYC' }

console.log('\n=== Destructuring Examples ===');
console.log('Uncomment any line to see the output\n');