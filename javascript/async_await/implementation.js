// Helper: Simulates API delay
function delay(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

// 1. Basic example
async function basicExample() {
  console.log('Starting...');
  
  // This pauses here for 2 seconds
  const result = await delay(2000, 'Data loaded!');
  
  console.log('Result:', result);
  console.log('Done!');
}

// basicExample();

// 2. Sequential vs Parallel
// Sequential - waits for each one to finish
async function sequentialExample() {
  console.log('Sequential start...');
  const start = Date.now();
  
  const user = await delay(1000, { id: 1, name: 'John' });
  const posts = await delay(1000, ['Post 1', 'Post 2']);
  const comments = await delay(1000, ['Comment 1']);
  
  console.log(`Done in ${Date.now() - start}ms`); // ~3000ms
  return { user, posts, comments };
}

// Parallel - all run at the same time
async function parallelExample() {
  console.log('Parallel start...');
  const start = Date.now();
  
  // Start all three at once
  const [user, posts, comments] = await Promise.all([
    delay(1000, { id: 1, name: 'John' }),
    delay(1000, ['Post 1', 'Post 2']),
    delay(1000, ['Comment 1'])
  ]);
  
  console.log(`Done in ${Date.now() - start}ms`); // ~1000ms
  return { user, posts, comments };
}

// sequentialExample();
// parallelExample();

// 3. Error handling - important!
// This function randomly fails
function randomOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('Success!');
      } else {
        reject(new Error('Failed!'));
      }
    }, 1000);
  });
}

// Without error handling - bad idea
async function noErrorHandling() {
  const result = await randomOperation(); // crashes if it fails
  return result;
}

// With error handling - the right way
async function withErrorHandling() {
  try {
    const result = await randomOperation();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Caught error:', error.message);
    return null; // return something instead of crashing
  }
}

// withErrorHandling();

// 4. Fetching data from API
async function fetchUserData(userId) {
  try {
    console.log(`Fetching user ${userId}...`);
    
    // Fetch user info
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const user = await response.json();
    console.log('Got user:', user.name);
    
    // Now fetch their posts
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await postsResponse.json();
    
    console.log('Posts:', posts.length);
    
    return {
      user,
      postsCount: posts.length,
      recentPosts: posts.slice(0, 3)
    };
    
  } catch (error) {
    console.error('Failed:', error.message);
    return null;
  }
}

// fetchUserData(1);

// 5. Fetching multiple things in parallel
async function fetchMultipleUsers(ids) {
  try {
    console.log('Fetching users...');
    
    // Create promises for each user
    const promises = ids.map(id => 
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
    );
    
    // Wait for all of them
    const users = await Promise.all(promises);
    
    console.log('Got users:', users.map(u => u.name));
    return users;
    
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// fetchMultipleUsers([1, 2, 3]);

// 6. Conditional fetching
async function getUserInfo(includeDetails = false) {
  try {
    // Always get basic info
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();
    
    console.log('User:', user.name);
    
    // Only get posts if needed
    if (includeDetails) {
      const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const posts = await postsRes.json();
      return { user, posts };
    }
    
    return { user };
    
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// getUserInfo(true);

// 7. Retry logic
async function fetchWithRetry(url, maxAttempts = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('Success!');
      return data;
      
    } catch (error) {
      console.log(`Attempt ${attempt} failed`);
      lastError = error;
      
      // Wait before trying again
      if (attempt < maxAttempts) {
        await delay(1000 * attempt); // wait 1s, then 2s, then 3s
      }
    }
  }
  
  throw lastError;
}

// fetchWithRetry('https://jsonplaceholder.typicode.com/users/1');

// 8. Timeout implementation
async function fetchWithTimeout(url, timeoutMs = 5000) {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    });
    
    const fetchPromise = fetch(url).then(res => res.json());
    
    // Whichever finishes first wins
    const data = await Promise.race([fetchPromise, timeoutPromise]);
    
    return data;
    
  } catch (error) {
    console.error('Failed:', error.message);
    return null;
  }
}

// fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 3000);

// 9. Processing arrays
// One by one (slow but sometimes needed)
async function processSequentially(items) {
  const results = [];
  
  for (const item of items) {
    const result = await delay(500, `Processed: ${item}`);
    console.log(result);
    results.push(result);
  }
  
  return results;
}

// All at once (fast)
async function processInParallel(items) {
  const results = await Promise.all(
    items.map(item => delay(500, `Processed: ${item}`))
  );
  
  results.forEach(r => console.log(r));
  return results;
}

// processSequentially(['A', 'B', 'C']);
// processInParallel(['A', 'B', 'C']);

// 10. Running async code immediately
// Use this pattern to run async code at top level
(async () => {
  const data = await delay(1000, 'Hello!');
  console.log(data);
})();

console.log('\n Async/Await Examples');
console.log('Uncomment any function to test it\n');