// 1. Creating a basic Promise
function basicPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved after 2 seconds!');
    }, 2000);
  });
}

// basicPromise().then(result => console.log(result));

// 2. Promise that can fail
function riskyOperation() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
      if (success) {
        resolve('Operation successful!');
      } else {
        reject('Operation failed!');
      }
    }, 1000);
  });
}

// riskyOperation()
//   .then(result => console.log('Success:', result))
//   .catch(error => console.error('Error:', error));

// 3. Promise chaining
function fetchUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe' });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, 1000);
  });
}

function fetchComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great post!', postId },
        { id: 2, text: 'Thanks for sharing', postId }
      ]);
    }, 1000);
  });
}

// Chaining them together
function getCompleteData() {
  fetchUser()
    .then(user => {
      console.log('Got user:', user.name);
      return fetchPosts(user.id); // Return the next Promise
    })
    .then(posts => {
      console.log('Got posts:', posts.length);
      return fetchComments(posts[0].id);
    })
    .then(comments => {
      console.log('Got comments:', comments.length);
    })
    .catch(error => {
      console.error('Something failed:', error);
    });
}

// getCompleteData();

// 4. Promise.all() - run multiple Promises in parallel
function parallelFetch() {
  const user1 = fetchUser();
  const user2 = fetchUser();
  const user3 = fetchUser();

  Promise.all([user1, user2, user3])
    .then(results => {
      console.log('All users fetched:', results);
      console.log('Total time: ~1 second (parallel)');
    })
    .catch(error => {
      console.error('At least one failed:', error);
    });
}

// parallelFetch();

// 5. Real API example with fetch
function getUserFromAPI(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(user => {
      console.log('User:', user.name);
      return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log('User has', posts.length, 'posts');
    })
    .catch(error => {
      console.error('Failed:', error.message);
    });
}

// getUserFromAPI(1);

// 6. Promise.race() - first one wins
function raceExample() {
  const slow = new Promise(resolve => {
    setTimeout(() => resolve('Slow response'), 3000);
  });

  const fast = new Promise(resolve => {
    setTimeout(() => resolve('Fast response'), 1000);
  });

  Promise.race([slow, fast])
    .then(result => {
      console.log('Winner:', result); // Will be "Fast response"
    });
}

// raceExample();

// 7. Promise.allSettled() - wait for all regardless of success/failure
function allSettledExample() {
  const promises = [
    Promise.resolve('Success 1'),
    Promise.reject('Failed'),
    Promise.resolve('Success 2'),
    Promise.reject('Failed again')
  ];

  Promise.allSettled(promises)
    .then(results => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Promise ${index + 1}: Success -`, result.value);
        } else {
          console.log(`Promise ${index + 1}: Failed -`, result.reason);
        }
      });
    });
}

// allSettledExample();

// 8. Converting callback to Promise
// Old callback style
function oldStyleAsync(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback('Invalid value', null);
    }
  }, 1000);
}

// Wrapped in Promise
function newStyleAsync(value) {
  return new Promise((resolve, reject) => {
    oldStyleAsync(value, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// newStyleAsync(5)
//   .then(result => console.log('Result:', result))
//   .catch(error => console.error('Error:', error));

// 9. Handling multiple API calls with Promise.all
function fetchMultipleUsers() {
  const userIds = [1, 2, 3];
  
  const promises = userIds.map(id => 
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
  );

  Promise.all(promises)
    .then(users => {
      console.log('Fetched all users:');
      users.forEach(user => console.log('-', user.name));
    })
    .catch(error => {
      console.error('Failed to fetch users:', error);
    });
}

// fetchMultipleUsers();

// 10. Promise with timeout
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url).then(res => res.json());
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

// fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 3000)
//   .then(data => console.log('Data:', data))
//   .catch(error => console.error('Error:', error.message));

// 11. Error handling in chains
function chainWithErrors() {
  Promise.resolve(5)
    .then(num => {
      console.log('Step 1:', num);
      return num * 2;
    })
    .then(num => {
      console.log('Step 2:', num);
      throw new Error('Something went wrong!'); // Simulating error
    })
    .then(num => {
      console.log('Step 3:', num); // This won't run
      return num * 2;
    })
    .catch(error => {
      console.error('Caught error:', error.message);
      return 0; // Recover from error
    })
    .then(num => {
      console.log('Step 4 (after recovery):', num); // This runs with 0
    });
}

// chainWithErrors();

// 12. Finally block - runs regardless of success or failure
function withFinally() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
    .then(data => console.log('Data:', data.name))
    .catch(error => console.error('Error:', error))
    .finally(() => {
      console.log('Cleanup - this always runs');
    });
}

// withFinally();

console.log('\n=== Promise Examples ===');
console.log('Uncomment any function to test it\n');