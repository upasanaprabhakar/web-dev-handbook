// 1. Spread with arrays - copying
const originalArray = [1, 2, 3, 4, 5];
const copiedArray = [...originalArray];

// console.log(originalArray); // [1, 2, 3, 4, 5]
// console.log(copiedArray);   // [1, 2, 3, 4, 5]

// Modifying copy doesn't affect original
copiedArray.push(6);
// console.log(originalArray); // [1, 2, 3, 4, 5]
// console.log(copiedArray);   // [1, 2, 3, 4, 5, 6]

// 2. Spread with arrays - merging
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'lettuce'];
const food = [...fruits, ...vegetables];

// console.log(food); // ['apple', 'banana', 'carrot', 'lettuce']

// 3. Spread with arrays - adding elements
const numbers = [2, 3, 4];
const withStart = [1, ...numbers];
const withEnd = [...numbers, 5];
const withBoth = [0, ...numbers, 5, 6];

// console.log(withStart); // [1, 2, 3, 4]
// console.log(withEnd);   // [2, 3, 4, 5]
// console.log(withBoth);  // [0, 2, 3, 4, 5, 6]

// 4. Spread with objects - copying
const user = { name: 'John', age: 25, city: 'NYC' };
const userCopy = { ...user };

userCopy.age = 26;
// console.log(user.age);     // 25
// console.log(userCopy.age); // 26

// 5. Spread with objects - merging
const basicInfo = { name: 'Alice', age: 30 };
const contactInfo = { email: 'alice@example.com', phone: '123-456' };
const fullInfo = { ...basicInfo, ...contactInfo };

// console.log(fullInfo);
// { name: 'Alice', age: 30, email: 'alice@example.com', phone: '123-456' }

// 6. Spread with objects - updating properties
const product = { name: 'Laptop', price: 1000, stock: 50 };
const updatedProduct = { ...product, price: 900, discount: 10 };

// console.log(updatedProduct);
// { name: 'Laptop', price: 900, stock: 50, discount: 10 }

// 7. Spread to convert string to array
const word = 'hello';
const letters = [...word];

// console.log(letters); // ['h', 'e', 'l', 'l', 'o']

// 8. Spread with Math functions
const nums = [5, 2, 8, 1, 9, 3];
const maxNum = Math.max(...nums);
const minNum = Math.min(...nums);

// console.log(maxNum); // 9
// console.log(minNum); // 1

// 9. Rest parameter in functions
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// console.log(sum(1, 2, 3));          // 6
// console.log(sum(1, 2, 3, 4, 5));    // 15
// console.log(sum(10, 20, 30, 40));   // 100

// 10. Rest with regular parameters
function introduce(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

// console.log(introduce('Hello', 'Alice', 'Bob', 'Charlie'));
// ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']

// 11. Rest in array destructuring
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const [primary, secondary, ...otherColors] = colors;

// console.log(primary);      // 'red'
// console.log(secondary);    // 'green'
// console.log(otherColors);  // ['blue', 'yellow', 'purple']

// 12. Rest in object destructuring
const person = {
  name: 'Bob',
  age: 28,
  city: 'LA',
  country: 'USA',
  occupation: 'Developer'
};

const { name, age, ...details } = person;

// console.log(name);    // 'Bob'
// console.log(age);     // 28
// console.log(details); // { city: 'LA', country: 'USA', occupation: 'Developer' }

// 13. Removing item from array using spread
const items = ['a', 'b', 'c', 'd', 'e'];
const indexToRemove = 2;

const newItems = [
  ...items.slice(0, indexToRemove),
  ...items.slice(indexToRemove + 1)
];

// console.log(newItems); // ['a', 'b', 'd', 'e']

// 14. Updating array element using spread
const scores = [10, 20, 30, 40];
const indexToUpdate = 2;
const newValue = 35;

const updatedScores = [
  ...scores.slice(0, indexToUpdate),
  newValue,
  ...scores.slice(indexToUpdate + 1)
];

// console.log(updatedScores); // [10, 20, 35, 40]

// 15. Conditional spreading
function createUser(name, age, includeAddress = false) {
  return {
    name,
    age,
    ...(includeAddress && {
      address: {
        city: 'NYC',
        country: 'USA'
      }
    })
  };
}

// console.log(createUser('John', 25, true));
// console.log(createUser('Jane', 30, false));

// 16. Default values with spread
const defaultSettings = {
  theme: 'light',
  fontSize: 14,
  notifications: true
};

const userSettings = { theme: 'dark', fontSize: 16 };

const finalSettings = { ...defaultSettings, ...userSettings };

// console.log(finalSettings);
// { theme: 'dark', fontSize: 16, notifications: true }

// 17. Combining multiple objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };

const combined = { ...obj1, ...obj2, ...obj3 };

// console.log(combined); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

// 18. Spread with Set
const numberSet = new Set([1, 2, 3, 4, 5]);
const arrayFromSet = [...numberSet];

// console.log(arrayFromSet); // [1, 2, 3, 4, 5]

// 19. Removing duplicates using spread and Set
const duplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(duplicates)];

// console.log(unique); // [1, 2, 3, 4, 5]

// 20. Rest parameter for flexible functions
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}

// console.log(multiply(2, 1, 2, 3));    // [2, 4, 6]
// console.log(multiply(3, 5, 10, 15));  // [15, 30, 45]

// 21. Real-world: Shopping cart operations
const cart = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 }
];

function addToCart(currentCart, newItem) {
  return [...currentCart, newItem];
}

function removeFromCart(currentCart, itemId) {
  return currentCart.filter(item => item.id !== itemId);
}

function updateCartItem(currentCart, itemId, updates) {
  return currentCart.map(item => 
    item.id === itemId ? { ...item, ...updates } : item
  );
}

const newCart = addToCart(cart, { id: 3, name: 'Keyboard', price: 75 });
// console.log(newCart);

// 22. Real-world: User profile updates
function updateProfile(currentProfile, updates) {
  return {
    ...currentProfile,
    ...updates,
    updatedAt: new Date().toISOString()
  };
}

const profile = { name: 'John', age: 25, email: 'john@example.com' };
const updated = updateProfile(profile, { age: 26, city: 'NYC' });

// console.log(updated);

// 23. Real-world: API configuration merging
const defaultConfig = {
  timeout: 5000,
  retries: 3,
  headers: { 'Content-Type': 'application/json' }
};

function makeRequest(url, userConfig = {}) {
  const config = {
    ...defaultConfig,
    ...userConfig,
    headers: {
      ...defaultConfig.headers,
      ...(userConfig.headers || {})
    }
  };
  
  return config;
}

const requestConfig = makeRequest('/api/users', {
  timeout: 10000,
  headers: { 'Authorization': 'Bearer token123' }
});

// console.log(requestConfig);

// 24. Real-world: Form data handling
function handleFormData(formData) {
  const { username, password, ...optionalFields } = formData;
  
  const user = {
    username,
    password,
    createdAt: Date.now(),
    ...optionalFields
  };
  
  return user;
}

const formSubmission = {
  username: 'john_doe',
  password: 'secret123',
  email: 'john@example.com',
  phone: '123-456-7890'
};

// console.log(handleFormData(formSubmission));

// 25. Real-world: Array pagination
function paginate(array, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  const paginatedItems = array.slice(start, start + itemsPerPage);
  
  return {
    items: [...paginatedItems],
    page,
    totalPages: Math.ceil(array.length / itemsPerPage),
    totalItems: array.length
  };
}

const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(paginate(allItems, 2, 3));

// 26. Cloning nested objects (shallow copy issue)
const nestedOriginal = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' }
};

const shallowCopy = { ...nestedOriginal };
shallowCopy.address.city = 'LA';

// console.log(nestedOriginal.address.city); // 'LA' - modified!
// console.log(shallowCopy.address.city);    // 'LA'

// Correct way - manual deep copy for nested objects
const deepCopy = {
  ...nestedOriginal,
  address: { ...nestedOriginal.address }
};

deepCopy.address.city = 'Chicago';
// console.log(nestedOriginal.address.city); // 'LA' (from previous example)
// console.log(deepCopy.address.city);       // 'Chicago'

// 27. Practical: Toggling boolean in object
function toggleSetting(settings, settingName) {
  return {
    ...settings,
    [settingName]: !settings[settingName]
  };
}

const appSettings = { darkMode: false, notifications: true };
const toggled = toggleSetting(appSettings, 'darkMode');

// console.log(toggled); // { darkMode: true, notifications: true }

// 28. Practical: Logger function with rest
function log(level, ...messages) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}]`, ...messages);
}

// log('INFO', 'User logged in', 'User ID: 123');
// log('ERROR', 'Failed to fetch data', 'Status: 404');

console.log('\n Spread & Rest Operators Examples');
console.log('Uncomment any line to see the output\n');