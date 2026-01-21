import { useState, useEffect } from 'react';

// 1. Basic useEffect - runs after every render
function BasicEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Effect ran, count is:', count);
  });
  
  return (
    <div>
      <h2>Basic Effect (runs every render)</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Check console to see effect running</p>
    </div>
  );
}

// 2. useEffect with empty dependency array - runs once
function MountEffect() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    console.log('Component mounted!');
    setMessage('Component loaded successfully');
  }, []);
  
  return (
    <div>
      <h2>Mount Effect (runs once)</h2>
      <p>{message}</p>
    </div>
  );
}

// 3. useEffect with dependencies
function DependencyEffect() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]); // Only runs when count changes
  
  return (
    <div>
      <h2>Dependency Effect</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type name (won't trigger effect)"
      />
    </div>
  );
}

// 4. Cleanup function - timer
function TimerCleanup() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, [isRunning]);
  
  return (
    <div>
      <h2>Timer with Cleanup</h2>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

// 5. Event listener cleanup
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Event listener removed');
    };
  }, []);
  
  return (
    <div>
      <h2>Window Size Tracker</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
      <p>Resize window to see updates</p>
    </div>
  );
}

// 6. Data fetching with useEffect
function DataFetcher() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  if (loading) return <div><h2>Data Fetching</h2><p>Loading...</p></div>;
  
  return (
    <div>
      <h2>Data Fetching</h2>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h4>{post.title}</h4>
          <p>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

// 7. Fetch with error handling
function UserFetcher() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  return (
    <div>
      <h2>User Fetcher with Error Handling</h2>
      <button onClick={() => setUserId(userId - 1)} disabled={userId === 1}>
        Previous User
      </button>
      <button onClick={() => setUserId(userId + 1)} disabled={userId === 10}>
        Next User
      </button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
}

// 8. Document title update
function PageTitleUpdater() {
  const [title, setTitle] = useState('My App');
  
  useEffect(() => {
    document.title = title;
  }, [title]);
  
  return (
    <div>
      <h2>Document Title Updater</h2>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter page title"
      />
      <p>Check the browser tab title</p>
    </div>
  );
}

// 9. LocalStorage sync
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('persistentCount');
    return saved ? JSON.parse(saved) : 0;
  });
  
  useEffect(() => {
    localStorage.setItem('persistentCount', JSON.stringify(count));
  }, [count]);
  
  return (
    <div>
      <h2>Persistent Counter (LocalStorage)</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p>Refresh page - count persists!</p>
    </div>
  );
}

// 10. Multiple useEffect hooks
function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Effect 1: Runs on count change
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  // Effect 2: Runs on name change
  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);
  
  // Effect 3: Runs once on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <h2>Multiple Effects</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Check console to see different effects</p>
    </div>
  );
}

// 11. Conditional effect execution
function ConditionalEffect() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isEnabled) return;
    
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isEnabled]);
  
  return (
    <div>
      <h2>Conditional Effect</h2>
      <p>Count: {count}</p>
      <button onClick={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? 'Stop' : 'Start'} Counter
      </button>
    </div>
  );
}

// 12. Search with debouncing using useEffect
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);
  
  useEffect(() => {
    if (debouncedTerm) {
      console.log('Searching for:', debouncedTerm);
      // Perform search here
    }
  }, [debouncedTerm]);
  
  return (
    <div>
      <h2>Search with Debouncing</h2>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
      />
      <p>Search term: {debouncedTerm}</p>
      <p>Check console (searches 500ms after typing stops)</p>
    </div>
  );
}

// 13. Race condition handling
function UserProfileSafe({ initialUserId = 1 }) {
  const [userId, setUserId] = useState(initialUserId);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        
        if (!cancelled) {
          setUser(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    return () => {
      cancelled = true;
    };
  }, [userId]);
  
  return (
    <div>
      <h2>Safe User Profile (Race Condition Handling)</h2>
      <button onClick={() => setUserId(userId - 1)} disabled={userId === 1}>
        Previous
      </button>
      <button onClick={() => setUserId(userId + 1)} disabled={userId === 10}>
        Next
      </button>
      
      {loading && <p>Loading...</p>}
      {user && !loading && (
        <div>
          <h3>{user.name}</h3>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
}

// 14. Scroll to top on mount
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <h2>Scroll to Top</h2>
      <p>This component scrolls to top when mounted</p>
    </div>
  );
}

// 15. Online/Offline status detector
function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div>
      <h2>Online Status Detector</h2>
      <p style={{ 
        color: isOnline ? 'green' : 'red',
        fontWeight: 'bold'
      }}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </p>
      <p>Try disconnecting your internet</p>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>useEffect Hook Examples</h1>
      <hr />
      <BasicEffect />
      <hr />
      <MountEffect />
      <hr />
      <DependencyEffect />
      <hr />
      <TimerCleanup />
      <hr />
      <WindowSizeTracker />
      <hr />
      <DataFetcher />
      <hr />
      <UserFetcher />
      <hr />
      <PageTitleUpdater />
      <hr />
      <PersistentCounter />
      <hr />
      <MultipleEffects />
      <hr />
      <ConditionalEffect />
      <hr />
      <SearchBox />
      <hr />
      <UserProfileSafe />
      <hr />
      <ScrollToTop />
      <hr />
      <OnlineStatus />
    </div>
  );
}