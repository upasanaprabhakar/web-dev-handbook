// 1. Basic currying - one argument at a time
const add = (a) => (b) => (c) => a + b + c;

// console.log(add(1)(2)(3)); // 6

// Store intermediate functions
const addOne = add(1);
const addOneAndTwo = addOne(2);
// console.log(addOneAndTwo(3)); // 6

// 2. Two-argument currying
const multiply = (a) => (b) => a * b;

const double = multiply(2);
const triple = multiply(3);
const quadruple = multiply(4);

// console.log(double(5));     // 10
// console.log(triple(5));     // 15
// console.log(quadruple(5));  // 20

// 3. Partial application with bind()
function greet(greeting, name) {
  return greeting + ', ' + name + '!';
}

const sayHello = greet.bind(null, 'Hello');
const sayHi = greet.bind(null, 'Hi');

// console.log(sayHello('John'));  // Hello, John!
// console.log(sayHi('Jane'));     // Hi, Jane!

// 4. Discount calculator
const applyDiscount = (discount) => (price) => {
  return price - (price * discount);
};

const tenPercentOff = applyDiscount(0.10);
const twentyPercentOff = applyDiscount(0.20);
const fiftyPercentOff = applyDiscount(0.50);

// console.log(tenPercentOff(100));    // 90
// console.log(twentyPercentOff(100)); // 80
// console.log(fiftyPercentOff(100));  // 50

// 5. Logger with levels
const log = (level) => (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
};

const errorLog = log('ERROR');
const infoLog = log('INFO');
const debugLog = log('DEBUG');

// errorLog('Database connection failed');
// infoLog('Server started on port 3000');
// debugLog('User input validated');

// 6. Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(3));     // 6
// console.log(curriedSum(1, 2)(3));     // 6
// console.log(curriedSum(1)(2, 3));     // 6
// console.log(curriedSum(1, 2, 3));     // 6

// 7. URL builder
const buildURL = (protocol) => (domain) => (path) => {
  return `${protocol}://${domain}${path}`;
};

const https = buildURL('https');
const httpsDomain = https('api.example.com');

// console.log(httpsDomain('/users'));     // https://api.example.com/users
// console.log(httpsDomain('/products'));  // https://api.example.com/products

// 8. Math operations
const calculate = (operation) => (a) => (b) => {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
    default: return 0;
  }
};

const addNum = calculate('add');
const subtractNum = calculate('subtract');
const multiplyNum = calculate('multiply');

// console.log(addNum(5)(3));      // 8
// console.log(subtractNum(5)(3)); // 2
// console.log(multiplyNum(5)(3)); // 15

// 9. Validation functions
const hasMinLength = (min) => (str) => str.length >= min;
const hasMaxLength = (max) => (str) => str.length <= max;
const hasNumber = (str) => /\d/.test(str);
const hasSpecialChar = (str) => /[!@#$%^&*]/.test(str);

const isValidPassword = hasMinLength(8);
const isValidUsername = hasMinLength(3);

// console.log(isValidPassword('abc123'));     // false
// console.log(isValidPassword('abc12345'));   // true
// console.log(isValidUsername('ab'));         // false
// console.log(isValidUsername('john'));       // true

// 10. Array filter builder
const filterBy = (property) => (value) => (array) => {
  return array.filter(item => item[property] === value);
};

const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
];

const filterByRole = filterBy('role');
const getAdmins = filterByRole('admin');

// console.log(getAdmins(users)); // [John, Bob]

// 11. Event handler factory
const createHandler = (type) => (callback) => {
  return function(event) {
    console.log(`Event: ${type}`);
    callback(event);
  };
};

const handleClick = createHandler('click');
const handleSubmit = createHandler('submit');

// const buttonHandler = handleClick(() => console.log('Button clicked'));
// buttonHandler(); // Event: click, Button clicked

// 12. Function composition
const compose = (f) => (g) => (x) => f(g(x));

const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
const subtractOne = (x) => x - 1;

const addTwoThenMultiply = compose(multiplyByThree)(addTwo);
// console.log(addTwoThenMultiply(5)); // (5 + 2) * 3 = 21

// 13. Pipe function (left to right composition)
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const transform = pipe(addTwo, multiplyByThree, subtractOne);
// console.log(transform(5)); // ((5 + 2) * 3) - 1 = 20

// 14. Infinite sum - Interview question
function infiniteSum(a) {
  return function(b) {
    if (b !== undefined) {
      return infiniteSum(a + b);
    }
    return a;
  };
}

// console.log(infiniteSum(1)(2)(3)(4)()); // 10
// console.log(infiniteSum(5)(10)(15)());  // 30

// 15. User factory
const createUser = (role) => (department) => (name) => {
  return {
    name,
    role,
    department,
    createdAt: new Date().toISOString()
  };
};

const createAdmin = createUser('admin');
const createITAdmin = createAdmin('IT');
const createHRUser = createUser('user')('HR');

// console.log(createITAdmin('John'));
// console.log(createHRUser('Jane'));

// 16. API request builder
const makeRequest = (method) => (url) => (data) => {
  return {
    method,
    url,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };
};

const post = makeRequest('POST');
const postUser = post('/api/users');

// console.log(postUser({ name: 'John', age: 25 }));

// 17. Tax calculator
const calculateTax = (rate) => (amount) => {
  const tax = amount * rate;
  return {
    amount,
    tax,
    total: amount + tax
  };
};

const gstCalc = calculateTax(0.18);  // 18% GST
const vatCalc = calculateTax(0.20);  // 20% VAT

// console.log(gstCalc(1000)); // { amount: 1000, tax: 180, total: 1180 }
// console.log(vatCalc(1000)); // { amount: 1000, tax: 200, total: 1200 }

// 18. String formatter
const formatString = (prefix) => (suffix) => (str) => {
  return `${prefix}${str}${suffix}`;
};

const addQuotes = formatString('"')('"');
const addBrackets = formatString('[')(']');
const addParens = formatString('(')(')');

// console.log(addQuotes('Hello'));    // "Hello"
// console.log(addBrackets('World'));  // [World]
// console.log(addParens('Test'));     // (Test)

// 19. Conditional executor
const ifThen = (condition) => (onTrue) => (onFalse) => (value) => {
  return condition(value) ? onTrue(value) : onFalse(value);
};

const isEven = (n) => n % 2 === 0;
const doubleIt = (n) => n * 2;
const tripleIt = (n) => n * 3;

const processNumber = ifThen(isEven)(doubleIt)(tripleIt);

// console.log(processNumber(4)); // 8 (even, so doubled)
// console.log(processNumber(5)); // 15 (odd, so tripled)

// 20. Map transformer
const mapWith = (fn) => (array) => array.map(fn);

const doubleAll = mapWith((x) => x * 2);
const squareAll = mapWith((x) => x * x);
const upperCaseAll = mapWith((s) => s.toUpperCase());

// console.log(doubleAll([1, 2, 3]));           // [2, 4, 6]
// console.log(squareAll([2, 3, 4]));           // [4, 9, 16]
// console.log(upperCaseAll(['a', 'b', 'c'])); // ['A', 'B', 'C']

// 21. Debounce with currying
const debounce = (delay) => (fn) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

const debounce300 = debounce(300);
const debouncedSearch = debounce300((query) => {
  console.log('Searching for:', query);
});

// debouncedSearch('React');

// 22. Range generator
const range = (start) => (end) => (step = 1) => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

const from1 = range(1);
const from1To10 = from1(10);

// console.log(from1To10());     // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(from1To10(2));    // [1, 3, 5, 7, 9]

// 23. Curry with placeholder
const __ = Symbol('placeholder');

function advancedCurry(fn) {
  return function curried(...args) {
    const hasPlaceholder = args.includes(__);
    
    if (!hasPlaceholder && args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...nextArgs) {
      const newArgs = args.map(arg => arg === __ ? nextArgs.shift() : arg);
      return curried(...newArgs, ...nextArgs);
    };
  };
}

function divide(a, b, c) {
  return a / b / c;
}

const curriedDivide = advancedCurry(divide);

// console.log(curriedDivide(100)(10)(2));      // 5
// console.log(curriedDivide(__, 10)(100)(2));  // 5
// console.log(curriedDivide(100, __, 2)(10));  // 5

// 24. Shopping cart with currying
const addToCart = (cart) => (product) => (quantity) => {
  return [...cart, { product, quantity }];
};

let myCart = [];
const addItem = addToCart(myCart);

const addLaptop = addItem('Laptop');
myCart = addLaptop(1);

const addMouse = addItem('Mouse');
myCart = addMouse(2);

// console.log(myCart);

// 25. Authentication middleware pattern
const authenticate = (role) => (permission) => (user) => {
  return user.role === role && user.permissions.includes(permission);
};

const isAdmin = authenticate('admin');
const canDelete = isAdmin('delete');

const user1 = { role: 'admin', permissions: ['read', 'write', 'delete'] };
const user2 = { role: 'user', permissions: ['read'] };

// console.log(canDelete(user1)); // true
// console.log(canDelete(user2)); // false

console.log('\n Currying & Partial Application Examples');
console.log('Uncomment any line to see the output\n');