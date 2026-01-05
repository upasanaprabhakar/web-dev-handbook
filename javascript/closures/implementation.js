// 1. Basic closure example
function outerFunction() {
  const message = "Hello from outer";
  
  function innerFunction() {
    console.log(message); // Can access outer's variable
  }
  
  return innerFunction;
}

const myFunc = outerFunction();
// myFunc(); // Prints: Hello from outer

// 2. Closure with parameters
function greet(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet("Hello");
const sayHi = greet("Hi");

// console.log(sayHello("John")); // Hello, John!
// console.log(sayHi("Jane"));    // Hi, Jane!

// 3. Counter using closure (data privacy)
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2
// console.log(counter.decrement()); // 1
// console.log(counter.getCount());  // 1
// console.log(counter.count);       // undefined - can't access directly

// 4. Function factory - creating similar functions
function multiplyBy(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
const quadruple = multiplyBy(4);

// console.log(double(5));     // 10
// console.log(triple(5));     // 15
// console.log(quadruple(5));  // 20

// 5. Private variables pattern
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited ${amount}. New balance: ${balance}`;
      }
      return 'Invalid amount';
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrawn ${amount}. New balance: ${balance}`;
      }
      return 'Invalid amount or insufficient funds';
    },
    getBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
// console.log(myAccount.deposit(500));   // Deposited 500. New balance: 1500
// console.log(myAccount.withdraw(200));  // Withdrawn 200. New balance: 1300
// console.log(myAccount.getBalance());   // 1300
// console.log(myAccount.balance);        // undefined - private!

// 6. Closure in loops - the classic mistake
function wrongLoop() {
  const functions = [];
  
  // Wrong - using var
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log('Value:', i);
    });
  }
  
  return functions;
}

const wrongFuncs = wrongLoop();
// wrongFuncs[0](); // Value: 3 (not 0!)
// wrongFuncs[1](); // Value: 3 (not 1!)
// wrongFuncs[2](); // Value: 3 (not 2!)

function correctLoop() {
  const functions = [];
  
  // Correct - using let (creates new binding each iteration)
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      console.log('Value:', i);
    });
  }
  
  return functions;
}

const correctFuncs = correctLoop();
// correctFuncs[0](); // Value: 0
// correctFuncs[1](); // Value: 1
// correctFuncs[2](); // Value: 2

// 7. Closure with setTimeout
function delayedGreeting(name) {
  setTimeout(function() {
    console.log(`Hello, ${name}!`); // Closure remembers 'name'
  }, 1000);
}

// delayedGreeting("Alice");

// 8. Creating a ID generator
function createIDGenerator() {
  let id = 0;
  
  return function() {
    id++;
    return `ID_${id}`;
  };
}

const generateID = createIDGenerator();
// console.log(generateID()); // ID_1
// console.log(generateID()); // ID_2
// console.log(generateID()); // ID_3

// 9. Closure captures reference, not value
function captureReference() {
  let value = 1;
  
  function showValue() {
    console.log('Value is:', value);
  }
  
  value = 2; // Changed before calling
  
  return showValue;
}

const show = captureReference();
// show(); // Value is: 2 (not 1!)

// 10. Multiple closures sharing same scope
function createCalculator() {
  let result = 0;
  
  return {
    add(num) {
      result += num;
      return this;
    },
    subtract(num) {
      result -= num;
      return this;
    },
    multiply(num) {
      result *= num;
      return this;
    },
    getResult() {
      return result;
    },
    reset() {
      result = 0;
      return this;
    }
  };
}

const calc = createCalculator();
// calc.add(10).multiply(2).subtract(5);
// console.log(calc.getResult()); // 15

// 11. Closure with event handlers (simulated)
function setupCounter() {
  let count = 0;
  
  return {
    onClick() {
      count++;
      console.log(`Button clicked ${count} times`);
    }
  };
}

const button = setupCounter();
// button.onClick(); // Button clicked 1 times
// button.onClick(); // Button clicked 2 times
// button.onClick(); // Button clicked 3 times

// 12. Creating a once function (runs only once)
function once(fn) {
  let hasRun = false;
  let result;
  
  return function(...args) {
    if (!hasRun) {
      hasRun = true;
      result = fn(...args);
      return result;
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initializing...');
  return 'Initialized';
});

// console.log(initialize()); // Initializing... Initialized
// console.log(initialize()); // Initialized (doesn't run again)
// console.log(initialize()); // Initialized

// 13. Memoization using closure
function memoize(fn) {
  const cache = {};
  
  return function(arg) {
    if (cache[arg]) {
      console.log('From cache:', arg);
      return cache[arg];
    }
    
    console.log('Computing:', arg);
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

const expensiveOperation = memoize((num) => {
  return num * num;
});

// console.log(expensiveOperation(5)); // Computing: 5, returns 25
// console.log(expensiveOperation(5)); // From cache: 5, returns 25
// console.log(expensiveOperation(10)); // Computing: 10, returns 100

// 14. Module pattern
const userModule = (function() {
  // Private variables and functions
  let users = [];
  let nextId = 1;
  
  function generateId() {
    return nextId++;
  }
  
  // Public API
  return {
    addUser(name) {
      const user = {
        id: generateId(),
        name: name
      };
      users.push(user);
      return user;
    },
    getUsers() {
      return [...users]; // Return copy, not reference
    },
    getUserById(id) {
      return users.find(user => user.id === id);
    }
  };
})();

// userModule.addUser('Alice');
// userModule.addUser('Bob');
// console.log(userModule.getUsers());
// console.log(userModule.users); // undefined - private!

console.log('\n Closure Examples');
console.log('Uncomment any function to test it\n');