// 1. Basic debounce implementation
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example usage
function search(query) {
  console.log('Searching for:', query);
}

const debouncedSearch = debounce(search, 500);

// debouncedSearch('h');       // Cancelled
// debouncedSearch('he');      // Cancelled
// debouncedSearch('hello');   // Executes after 500ms

// 2. Basic throttle implementation
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Example usage
function logScroll() {
  console.log('Scrolled at:', Date.now());
}

const throttledScroll = throttle(logScroll, 1000);

// throttledScroll(); // Executes immediately
// throttledScroll(); // Ignored
// throttledScroll(); // Ignored
// After 1 second, can execute again

// 3. Debounce with immediate execution option
function debounceImmediate(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(this, args);
    }
  };
}

// Example: Execute immediately on first call
function saveData(data) {
  console.log('Saving:', data);
}

const saveImmediate = debounceImmediate(saveData, 1000, true);
// saveImmediate('data1'); // Executes immediately
// saveImmediate('data2'); // Waits 1 second

// 4. Throttle with trailing execution
function throttleTrailing(func, limit) {
  let inThrottle;
  let lastArgs;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

// 5. Real-world: Search box debouncing
function setupSearchBox() {
  function performSearch(query) {
    if (query.length < 3) {
      console.log('Query too short');
      return;
    }
    
    console.log('Searching API for:', query);
    // fetch(`/api/search?q=${query}`)
    //   .then(res => res.json())
    //   .then(results => console.log(results));
  }
  
  const debouncedSearchBox = debounce(performSearch, 500);
  
  // Simulating user typing
  debouncedSearchBox('j');
  debouncedSearchBox('ja');
  debouncedSearchBox('jav');
  debouncedSearchBox('java');
  debouncedSearchBox('javasc');
  debouncedSearchBox('javascript');
  // Only last one executes after 500ms
}

// setupSearchBox();

// 6. Real-world: Window resize handler
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log('Window size:', width, 'x', height);
  // Recalculate layouts, update charts, etc.
}

const debouncedResize = debounce(handleResize, 250);

// window.addEventListener('resize', debouncedResize);

// 7. Real-world: Scroll position tracking with throttle
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  console.log('Scroll progress:', Math.round(scrollPercent) + '%');
}

const throttledScrollProgress = throttle(updateScrollProgress, 100);

// window.addEventListener('scroll', throttledScrollProgress);

// 8. Real-world: Auto-save with debounce
const autoSave = (function() {
  let savedData = '';
  
  function save(data) {
    savedData = data;
    console.log('Auto-saved:', data);
    // API call to save data
  }
  
  const debouncedSave = debounce(save, 2000);
  
  return {
    updateContent: function(content) {
      console.log('Content changed:', content);
      debouncedSave(content);
    }
  };
})();

// autoSave.updateContent('Hello');
// autoSave.updateContent('Hello World');
// autoSave.updateContent('Hello World!');
// Saves only "Hello World!" after 2 seconds

// 9. Real-world: Button click prevention
function submitForm(data) {
  console.log('Form submitted with:', data);
  // API call here
}

const throttledSubmit = throttle(submitForm, 2000);

// Simulating rapid clicks
// throttledSubmit('data1'); // Executes
// throttledSubmit('data2'); // Ignored
// throttledSubmit('data3'); // Ignored
// After 2 seconds, can submit again

// 10. Comparing execution counts
function demonstrateEfficiency() {
  let normalCount = 0;
  let debouncedCount = 0;
  let throttledCount = 0;
  
  function normalFunction() {
    normalCount++;
  }
  
  const debouncedFunction = debounce(() => {
    debouncedCount++;
  }, 500);
  
  const throttledFunction = throttle(() => {
    throttledCount++;
  }, 500);
  
  // Simulate 10 rapid calls
  for (let i = 0; i < 10; i++) {
    normalFunction();
    debouncedFunction();
    throttledFunction();
  }
  
  setTimeout(() => {
    console.log('Normal calls:', normalCount);      // 10
    console.log('Debounced calls:', debouncedCount); // 1
    console.log('Throttled calls:', throttledCount); // 1-2
  }, 1000);
}

// demonstrateEfficiency();

// 11. Debounce with cancel method
function debounceWithCancel(func, delay) {
  let timeoutId;
  
  const debounced = function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
  
  debounced.cancel = function() {
    clearTimeout(timeoutId);
  };
  
  return debounced;
}

const cancellableDebounce = debounceWithCancel((msg) => {
  console.log(msg);
}, 1000);

// cancellableDebounce('Hello');
// cancellableDebounce.cancel(); // Cancels the pending call

// 12. Real-world: Mouse movement tracking
function trackMousePosition(event) {
  console.log('Mouse at:', event.clientX, event.clientY);
  // Update UI elements based on position
}

const throttledMouseMove = throttle(trackMousePosition, 100);

// document.addEventListener('mousemove', throttledMouseMove);

// 13. Real-world: API rate limiting
const apiRateLimiter = (function() {
  const callApi = throttle((endpoint, data) => {
    console.log('API call to:', endpoint, 'with:', data);
    // fetch(endpoint, { method: 'POST', body: JSON.stringify(data) })
  }, 1000);
  
  return {
    post: callApi
  };
})();

// apiRateLimiter.post('/api/data', { value: 1 }); // Executes
// apiRateLimiter.post('/api/data', { value: 2 }); // Ignored (within 1 second)

// 14. Real-world: Infinite scroll with throttle
function loadMoreContent() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  
  if (scrollPosition >= pageHeight - 100) {
    console.log('Loading more content...');
    // Fetch and append more content
  }
}

const throttledLoadMore = throttle(loadMoreContent, 500);

// window.addEventListener('scroll', throttledLoadMore);

// 15. Real-world: Form validation with debounce
function validateField(fieldName, value) {
  console.log(`Validating ${fieldName}:`, value);
  
  // Simulate API validation
  if (fieldName === 'email') {
    const isValid = value.includes('@');
    console.log('Email valid:', isValid);
    return isValid;
  }
  
  if (fieldName === 'username') {
    const isAvailable = value.length >= 3;
    console.log('Username available:', isAvailable);
    return isAvailable;
  }
}

const debouncedValidation = debounce(validateField, 800);

// debouncedValidation('email', 'test');
// debouncedValidation('email', 'test@');
// debouncedValidation('email', 'test@example.com');
// Only validates last input after 800ms

// 16. Performance monitoring
function measurePerformance() {
  const startTime = Date.now();
  let callCount = 0;
  
  function expensiveOperation() {
    callCount++;
    // Simulate expensive calculation
    for (let i = 0; i < 1000000; i++) {
      Math.sqrt(i);
    }
  }
  
  // Without optimization
  for (let i = 0; i < 100; i++) {
    expensiveOperation();
  }
  
  const normalTime = Date.now() - startTime;
  
  // With throttling
  const throttledOp = throttle(expensiveOperation, 100);
  const startTimeThrottled = Date.now();
  
  for (let i = 0; i < 100; i++) {
    throttledOp();
  }
  
  setTimeout(() => {
    const throttledTime = Date.now() - startTimeThrottled;
    console.log('Normal execution time:', normalTime + 'ms');
    console.log('Throttled execution time:', throttledTime + 'ms');
    console.log('Performance improvement:', Math.round((1 - throttledTime/normalTime) * 100) + '%');
  }, 200);
}

// measurePerformance();

// 17. Practical: Search with loading state
const searchWithLoading = (function() {
  let isLoading = false;
  
  function performSearchWithState(query) {
    isLoading = true;
    console.log('Loading: true');
    console.log('Searching for:', query);
    
    // Simulate API call
    setTimeout(() => {
      isLoading = false;
      console.log('Loading: false');
      console.log('Results for:', query);
    }, 1000);
  }
  
  const debouncedSearchWithState = debounce(performSearchWithState, 500);
  
  return {
    search: debouncedSearchWithState,
    isLoading: () => isLoading
  };
})();

// searchWithLoading.search('test');

// 18. Practical: Lazy loading images on scroll
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      console.log('Loaded image:', img.src);
    }
  });
}

const throttledLazyLoad = throttle(lazyLoadImages, 200);

// window.addEventListener('scroll', throttledLazyLoad);

// 19. Cleanup example for event listeners
function setupWithCleanup() {
  const handler = debounce(() => {
    console.log('Handler called');
  }, 500);
  
  window.addEventListener('resize', handler);
  
  // Cleanup function
  return function cleanup() {
    window.removeEventListener('resize', handler);
    console.log('Event listener removed');
  };
}

// const cleanup = setupWithCleanup();
// Later: cleanup();

// 20. Comparing both techniques side by side
function compareDebounceThrottle() {
  let debounceCount = 0;
  let throttleCount = 0;
  
  const debouncedFn = debounce(() => {
    debounceCount++;
    console.log('Debounce executed, count:', debounceCount);
  }, 1000);
  
  const throttledFn = throttle(() => {
    throttleCount++;
    console.log('Throttle executed, count:', throttleCount);
  }, 1000);
  
  // Simulate events over 5 seconds
  const interval = setInterval(() => {
    debouncedFn();
    throttledFn();
  }, 100);
  
  setTimeout(() => {
    clearInterval(interval);
    console.log('\nFinal counts:');
    console.log('Debounce:', debounceCount); // 1-2 times
    console.log('Throttle:', throttleCount); // ~5 times
  }, 5000);
}

// compareDebounceThrottle();

console.log('\n Debouncing & Throttling Examples');
console.log('Uncomment any function to see it in action\n');