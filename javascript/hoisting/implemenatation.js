// 1. Function declaration hoisting
sayHello(); // Works! Prints "Hello"

function sayHello() {
  console.log('Hello');
}

// 2. var hoisting - declaration hoisted, value is undefined
function varHoistingExample() {
  console.log(username); // undefined (not error)
  var username = 'John';
  console.log(username); // 'John'
}

// varHoistingExample();

// 3. let hoisting - temporal dead zone
function letHoistingExample() {
  // console.log(userAge); // ReferenceError: Cannot access before initialization
  let userAge = 25;
  console.log(userAge); // 25
}

// letHoistingExample();

// 4. const hoisting - also in temporal dead zone
function constHoistingExample() {
  // console.log(PI); // ReferenceError
  const PI = 3.14159;
  console.log(PI); // 3.14159
}

// constHoistingExample();

// 5. Function expression with var - NOT hoisted
function functionExpressionVar() {
  // console.log(greet); // undefined
  // greet(); // TypeError: greet is not a function
  
  var greet = function() {
    console.log('Hi there');
  };
  
  greet(); // Works now
}

// functionExpressionVar();

// 6. Function expression with let - temporal dead zone
function functionExpressionLet() {
  // console.log(greetUser); // ReferenceError
  
  let greetUser = function() {
    console.log('Hello user');
  };
  
  greetUser(); // Works
}

// functionExpressionLet();

// 7. Arrow function hoisting - same as function expressions
function arrowFunctionExample() {
  // console.log(multiply); // ReferenceError
  
  const multiply = (a, b) => a * b;
  
  console.log(multiply(5, 3)); // 15
}

// arrowFunctionExample();

// 8. var in loops - classic hoisting issue
function varLoopProblem() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log('var i:', i); // Prints 3, 3, 3
    }, 100);
  }
}

// varLoopProblem();

// 9. let in loops - block scoped, works correctly
function letLoopSolution() {
  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      console.log('let j:', j); // Prints 0, 1, 2
    }, 200);
  }
}

// letLoopSolution();

// 10. Variable shadowing with hoisting
function shadowingExample() {
  var globalName = 'Global';
  
  function inner() {
    console.log(globalName); // undefined (not 'Global')
    var globalName = 'Local';
    console.log(globalName); // 'Local'
  }
  
  inner();
  console.log(globalName); // 'Global'
}

// shadowingExample();

// 11. Function scope vs block scope
function scopeComparison() {
  if (true) {
    var functionScoped = 'var - function scoped';
    let blockScoped = 'let - block scoped';
  }
  
  console.log(functionScoped); // Works - var ignores blocks
  // console.log(blockScoped);  // ReferenceError - let respects blocks
}

// scopeComparison();

// 12. Hoisting in nested functions
function outerFunction() {
  var outerVar = 'outer';
  
  function innerFunction() {
    console.log(outerVar); // 'outer'
    console.log(innerVar); // undefined
    var innerVar = 'inner';
    console.log(innerVar); // 'inner'
  }
  
  innerFunction();
}

// outerFunction();

// 13. Class hoisting - temporal dead zone
function classHoistingExample() {
  // const instance = new Person('John'); // ReferenceError
  
  class Person {
    constructor(name) {
      this.name = name;
    }
  }
  
  const instance = new Person('John'); // Works
  console.log(instance.name);
}

// classHoistingExample();

// 14. Multiple declarations with var
function multipleVarDeclarations() {
  var count = 1;
  console.log(count); // 1
  
  var count = 2; // No error with var
  console.log(count); // 2
  
  // let value = 1;
  // let value = 2; // SyntaxError: Identifier 'value' has already been declared
}

// multipleVarDeclarations();

// 15. Accidental global without declaration
function accidentalGlobal() {
  function createGlobal() {
    accidentalVar = 'I am global'; // No var/let/const
  }
  
  createGlobal();
  console.log(accidentalVar); // Works (bad!)
}

// accidentalGlobal();

// 16. Strict mode prevents accidental globals
function strictModeExample() {
  'use strict';
  
  function createVariable() {
    // strictVar = 'test'; // ReferenceError in strict mode
    let strictVar = 'test'; // Correct way
    console.log(strictVar);
  }
  
  createVariable();
}

// strictModeExample();

// 17. Hoisting with conditional declarations
function conditionalHoisting() {
  console.log(conditionalVar); // undefined
  
  if (false) {
    var conditionalVar = 'never assigned';
  }
  
  console.log(conditionalVar); // still undefined
  // var is hoisted but never assigned
}

// conditionalHoisting();

// 18. Real-world example - initialization order
function initializationOrder() {
  // Wrong order
  // var app = new Application(settings); // settings is undefined
  // var settings = { theme: 'dark' };
  
  // Correct order
  var settings = { theme: 'dark' };
  
  function Application(config) {
    this.theme = config.theme;
  }
  
  var app = new Application(settings);
  console.log('App theme:', app.theme);
}

// initializationOrder();

// 19. Temporal dead zone demonstration
function temporalDeadZoneDemo() {
  console.log('Before TDZ');
  
  {
    // TDZ starts for myVar
    // console.log(myVar); // ReferenceError
    
    let myVar = 'initialized'; // TDZ ends
    console.log(myVar); // Works
  }
  
  console.log('After block');
}

// temporalDeadZoneDemo();

// 20. Comparing var, let, const hoisting
function compareHoisting() {
  console.log('=== Hoisting Comparison ===');
  
  // var - hoisted and initialized with undefined
  console.log('var example:', typeof varVariable); // 'undefined'
  var varVariable = 'var value';
  
  // let - hoisted but in TDZ
  // console.log(letVariable); // ReferenceError
  let letVariable = 'let value';
  console.log('let example:', letVariable);
  
  // const - hoisted but in TDZ
  // console.log(constVariable); // ReferenceError
  const constVariable = 'const value';
  console.log('const example:', constVariable);
}

// compareHoisting();

// 21. Function hoisting priority
function functionHoistingPriority() {
  console.log(typeof getValue); // 'function'
  
  var getValue = 'I am a string';
  
  function getValue() {
    return 'I am a function';
  }
  
  console.log(typeof getValue); // 'string'
  // Function declaration hoisted first, then var assignment overwrites
}

// functionHoistingPriority();

// 22. Hoisting in switch statements
function switchHoisting() {
  switch (true) {
    case true:
      var switchVar = 'defined in switch';
      let switchLet = 'block scoped';
      break;
  }
  
  console.log(switchVar); // Works - var ignores block
  // console.log(switchLet); // ReferenceError - let respects block
}

// switchHoisting();

// 23. IIFE and hoisting
(function() {
  console.log('IIFE example');
  console.log(iifeVar); // undefined
  var iifeVar = 'hoisted in IIFE';
  console.log(iifeVar); // 'hoisted in IIFE'
})();

// 24. Named function expressions
function namedFunctionExpression() {
  var factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
  };
  
  console.log(factorial(5)); // 120
  // console.log(fact(5)); // ReferenceError - fact not hoisted
}

// namedFunctionExpression();

// 25. Best practice example
function bestPracticeExample() {
  // Declare all variables at top
  const PI = 3.14159;
  let radius = 5;
  let area;
  
  // Clear, predictable code
  area = PI * radius * radius;
  console.log('Area:', area);
  
  // Declare functions before use
  function calculateCircumference(r) {
    return 2 * PI * r;
  }
  
  const circumference = calculateCircumference(radius);
  console.log('Circumference:', circumference);
}

// bestPracticeExample();

console.log('\n Hoisting Examples');
console.log('Uncomment any function to see hoisting in action\n');