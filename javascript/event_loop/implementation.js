// 1. Basic execution order
function basicOrder() {
  console.log('1 - Synchronous');
  
  setTimeout(() => {
    console.log('2 - Timeout (Macrotask)');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('3 - Promise (Microtask)');
  });
  
  console.log('4 - Synchronous');
}

// basicOrder();
// Output: 1, 4, 3, 2

// 2. Multiple microtasks and macrotasks
function multipleTasksExample() {
  console.log('Start');
  
  setTimeout(() => console.log('Timeout 1'), 0);
  setTimeout(() => console.log('Timeout 2'), 0);
  
  Promise.resolve()
    .then(() => console.log('Promise 1'))
    .then(() => console.log('Promise 2'));
  
  console.log('End');
}

// multipleTasksExample();
// Output: Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2

// 3. Promise executor runs immediately
function promiseExecutorTiming() {
  console.log('1');
  
  new Promise((resolve) => {
    console.log('2 - Inside Promise executor (sync!)');
    resolve();
  }).then(() => {
    console.log('3 - Then callback (microtask)');
  });
  
  console.log('4');
}

// promiseExecutorTiming();
// Output: 1, 2, 4, 3

// 4. Async/await and Event Loop
async function asyncAwaitTiming() {
  console.log('1');
  
  await Promise.resolve();
  
  console.log('2 - After await (microtask)');
}

function testAsyncTiming() {
  console.log('Start');
  asyncAwaitTiming();
  console.log('End');
}

// testAsyncTiming();
// Output: Start, 1, End, 2

// 5. Chained promises
function chainedPromises() {
  Promise.resolve()
    .then(() => {
      console.log('Promise 1');
      return Promise.resolve();
    })
    .then(() => {
      console.log('Promise 2');
    })
    .then(() => {
      console.log('Promise 3');
    });
  
  console.log('Synchronous');
}

// chainedPromises();
// Output: Synchronous, Promise 1, Promise 2, Promise 3

// 6. Mixing everything together
function mixedExample() {
  console.log('1');
  
  setTimeout(() => console.log('2 - setTimeout'), 0);
  
  Promise.resolve()
    .then(() => console.log('3 - Promise 1'))
    .then(() => {
      console.log('4 - Promise 2');
      setTimeout(() => console.log('5 - setTimeout inside Promise'), 0);
    });
  
  console.log('6');
}

// mixedExample();
// Output: 1, 6, 3, 4, 2, 5

// 7. setTimeout with different delays
function timeoutDelays() {
  console.log('Start');
  
  setTimeout(() => console.log('0ms timeout'), 0);
  setTimeout(() => console.log('100ms timeout'), 100);
  
  // Heavy sync work
  let count = 0;
  for (let i = 0; i < 1000000000; i++) {
    count++;
  }
  
  console.log('End heavy work');
}

// timeoutDelays();
// Both timeouts wait for sync work to finish first

// 8. Microtask queue exhaustion
function microtaskExhaustion() {
  console.log('Start');
  
  setTimeout(() => console.log('Timeout'), 0);
  
  Promise.resolve().then(() => {
    console.log('Promise 1');
    Promise.resolve().then(() => {
      console.log('Promise 2 (created by Promise 1)');
    });
  });
  
  console.log('End');
}

// microtaskExhaustion();
// Output: Start, End, Promise 1, Promise 2, Timeout
// All microtasks run before any macrotask

// 9. Real-world: Breaking up heavy work
function processLargeDataset(data) {
  const batchSize = 1000;
  let currentIndex = 0;
  
  function processBatch() {
    const endIndex = Math.min(currentIndex + batchSize, data.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
      // Process each item
      data[i] = data[i] * 2;
    }
    
    currentIndex = endIndex;
    
    if (currentIndex < data.length) {
      console.log(`Processed ${currentIndex}/${data.length}`);
      setTimeout(processBatch, 0); // Let other tasks run
    } else {
      console.log('Processing complete!');
    }
  }
  
  processBatch();
}

// const largeArray = new Array(5000).fill(1);
// processLargeDataset(largeArray);

// 10. Callback queue vs Microtask queue
function queueComparison() {
  console.log('Script start');
  
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  Promise.resolve()
    .then(() => {
      console.log('Promise 1');
    })
    .then(() => {
      console.log('Promise 2');
    });
  
  queueMicrotask(() => {
    console.log('queueMicrotask');
  });
  
  console.log('Script end');
}

// queueComparison();
// Output: Script start, Script end, Promise 1, queueMicrotask, Promise 2, setTimeout

// 11. Nested setTimeout
function nestedSetTimeout() {
  console.log('Start');
  
  setTimeout(() => {
    console.log('Outer timeout');
    
    setTimeout(() => {
      console.log('Inner timeout');
    }, 0);
    
    Promise.resolve().then(() => {
      console.log('Promise inside timeout');
    });
  }, 0);
  
  console.log('End');
}

// nestedSetTimeout();
// Output: Start, End, Outer timeout, Promise inside timeout, Inner timeout

// 12. Async function with multiple awaits
async function multipleAwaits() {
  console.log('1');
  
  await Promise.resolve();
  console.log('2');
  
  await Promise.resolve();
  console.log('3');
  
  await Promise.resolve();
  console.log('4');
}

function testMultipleAwaits() {
  console.log('Start');
  multipleAwaits();
  console.log('End');
}

// testMultipleAwaits();
// Output: Start, 1, End, 2, 3, 4

// 13. Promise.resolve() vs new Promise()
function promiseCreationComparison() {
  console.log('1');
  
  // Promise.resolve - already resolved
  Promise.resolve().then(() => console.log('2'));
  
  // new Promise - executor runs immediately
  new Promise(resolve => {
    console.log('3');
    resolve();
  }).then(() => console.log('4'));
  
  console.log('5');
}

// promiseCreationComparison();
// Output: 1, 3, 5, 2, 4

// 14. Real-world: Debouncing with Event Loop
function createDebounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedLog = createDebounce((msg) => {
  console.log('Debounced:', msg);
}, 300);

// debouncedLog('First');
// debouncedLog('Second');
// debouncedLog('Third');
// Only "Third" will log after 300ms

// 15. Visualizing call stack emptying
function callStackVisualization() {
  console.log('1 - Call stack has this');
  
  Promise.resolve().then(() => {
    console.log('3 - Call stack was empty, now executing microtask');
  });
  
  console.log('2 - Call stack still has this');
  
  // After line above, call stack empties
  // Event loop then picks up microtask
}

// callStackVisualization();

// 16. Complex real-world scenario
async function complexScenario() {
  console.log('1');
  
  setTimeout(() => console.log('2'), 0);
  
  await Promise.resolve();
  
  console.log('3');
  
  setTimeout(() => console.log('4'), 0);
  
  Promise.resolve().then(() => console.log('5'));
  
  console.log('6');
}

function runComplexScenario() {
  console.log('Start');
  complexScenario();
  console.log('End');
}

// runComplexScenario();
// Output: Start, 1, End, 3, 6, 5, 2, 4

// 17. Understanding blocking behavior
function blockingExample() {
  console.log('Start');
  
  setTimeout(() => console.log('This waits'), 0);
  
  // Blocking operation
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Blocks for 2 seconds
  }
  
  console.log('End blocking');
}

// blockingExample();
// "This waits" only runs after 2-second block

// 18. Non-blocking alternative
async function nonBlockingAlternative() {
  console.log('Start');
  
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Step ${i + 1}`);
  }
  
  console.log('Done');
}

// nonBlockingAlternative();

console.log('\n Event Loop Examples');
console.log('Uncomment any function to see execution order\n');