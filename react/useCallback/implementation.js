import { useState, useCallback, memo, useEffect, useRef } from 'react';

// 1. Basic useCallback - Preventing Child Re-renders
const ChildComponent = memo(({ onClick, label }) => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`${label} rendered ${renderCount.current} times`);
  
  return (
    <div>
      <button onClick={onClick}>{label}</button>
      <span> (Rendered {renderCount.current} times)</span>
    </div>
  );
});

function BasicCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Without useCallback - recreated every render
  const handleWithout = () => {
    console.log('Without useCallback');
  };
  
  // With useCallback - cached
  const handleWith = useCallback(() => {
    console.log('With useCallback');
  }, []);
  
  return (
    <div>
      <h3>1. Basic useCallback</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type here"
      />
      <br /><br />
      <ChildComponent onClick={handleWithout} label="Without useCallback" />
      <ChildComponent onClick={handleWith} label="With useCallback" />
      <p>Type in input and check console - see which child re-renders</p>
      <hr />
    </div>
  );
}

// 2. useCallback with Dependencies
function CallbackWithDependencies() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  
  // Recreates only when multiplier changes
  const handleCalculate = useCallback(() => {
    console.log('Calculating:', count * multiplier);
    alert(`Result: ${count * multiplier}`);
  }, [count, multiplier]);
  
  return (
    <div>
      <h3>2. useCallback with Dependencies</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <br />
      <p>Multiplier: {multiplier}</p>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
      <br /><br />
      <button onClick={handleCalculate}>Calculate (Count × Multiplier)</button>
      <p>Check console to see when function is recreated</p>
      <hr />
    </div>
  );
}

// 3. useCallback with useEffect
function CallbackWithEffect() {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState(null);
  
  const fetchUser = useCallback(async () => {
    console.log('Fetching user:', userId);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const result = await response.json();
    setData(result);
  }, [userId]);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return (
    <div>
      <h3>3. useCallback with useEffect</h3>
      <button onClick={() => setUserId(userId - 1)} disabled={userId === 1}>Previous User</button>
      <button onClick={() => setUserId(userId + 1)} disabled={userId === 10}>Next User</button>
      <br />
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
      <hr />
    </div>
  );
}

// 4. Functional Updates - No Dependencies
function FunctionalUpdates() {
  const [count, setCount] = useState(0);
  
  // With state dependency - recreated every time count changes
  const incrementBad = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  // With functional update - never recreated
  const incrementGood = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <h3>4. Functional Updates</h3>
      <p>Count: {count}</p>
      <button onClick={incrementBad}>Increment (with dependency)</button>
      <button onClick={incrementGood}>Increment (functional update)</button>
      <p>Both work the same, but functional update is more efficient</p>
      <hr />
    </div>
  );
}

// 5. Todo List with useCallback
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem rendered:', todo.text);
  
  return (
    <li>
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

function TodoListDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk dog', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);
  
  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);
  
  const handleAdd = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };
  
  return (
    <div>
      <h3>5. Todo List with useCallback</h3>
      <input 
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <p>Check console - only modified todo re-renders</p>
      <hr />
    </div>
  );
}

// 6. Search with Debounce
function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);
  
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    
    console.log('Searching for:', searchQuery);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`);
    const data = await response.json();
    setResults(data);
  }, []);
  
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  }, [performSearch]);
  
  return (
    <div>
      <h3>6. Search with Debounce</h3>
      <input 
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
      />
      <p>Results: {results.length}</p>
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

// 7. Form Handlers
function FormHandlers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleFieldChange = useCallback((field) => {
    return (e) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);
  
  const handleSubmit = useCallback(() => {
    console.log('Submitted:', formData);
    alert(JSON.stringify(formData, null, 2));
  }, [formData]);
  
  return (
    <div>
      <h3>7. Form with useCallback</h3>
      <input 
        value={formData.name}
        onChange={handleFieldChange('name')}
        placeholder="Name"
      />
      <br />
      <input 
        value={formData.email}
        onChange={handleFieldChange('email')}
        placeholder="Email"
      />
      <br />
      <textarea 
        value={formData.message}
        onChange={handleFieldChange('message')}
        placeholder="Message"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <hr />
    </div>
  );
}

// 8. Counter with Multiple Callbacks
const CounterDisplay = memo(({ count, onIncrement, onDecrement, onReset }) => {
  console.log('CounterDisplay rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
});

function MultipleCallbacks() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);
  
  return (
    <div>
      <h3>8. Multiple Callbacks</h3>
      <CounterDisplay 
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
      />
      <button onClick={() => setOtherState(otherState + 1)}>
        Other State: {otherState}
      </button>
      <p>Check console - CounterDisplay doesn't re-render when other state changes</p>
      <hr />
    </div>
  );
}

// 9. Comparison: With vs Without useCallback
const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`${label} ExpensiveChild rendered`);
  
  // Simulate expensive render
  let i = 0;
  while (i < 100000000) i++;
  
  return <button onClick={onClick}>{label}</button>;
});

function ComparisonDemo() {
  const [count, setCount] = useState(0);
  
  // Without useCallback
  const handleWithout = () => {
    console.log('Without useCallback clicked');
  };
  
  // With useCallback
  const handleWith = useCallback(() => {
    console.log('With useCallback clicked');
  }, []);
  
  return (
    <div>
      <h3>9. Performance Comparison</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (triggers re-render)</button>
      <br /><br />
      <ExpensiveChild onClick={handleWithout} label="Without useCallback" />
      <ExpensiveChild onClick={handleWith} label="With useCallback" />
      <p>Click increment and notice the delay - one child re-renders unnecessarily</p>
      <hr />
    </div>
  );
}

// 10. Event Handler with Parameters
const ListItem = memo(({ item, onEdit, onDelete }) => {
  console.log('ListItem rendered:', item.name);
  
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onEdit(item.id)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

function ListWithCallbacks() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
  
  const handleEdit = useCallback((id) => {
    console.log('Editing item:', id);
    const newName = prompt('Enter new name:');
    if (newName) {
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, name: newName } : item
      ));
    }
  }, []);
  
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  
  return (
    <div>
      <h3>10. List with Event Handlers</h3>
      {items.map(item => (
        <ListItem 
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      <p>Check console - only affected item re-renders</p>
      <hr />
    </div>
  );
}

// Main App
export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>useCallback Hook Examples</h1>
      <BasicCallbackDemo />
      <CallbackWithDependencies />
      <CallbackWithEffect />
      <FunctionalUpdates />
      <TodoListDemo />
      <SearchWithDebounce />
      <FormHandlers />
      <MultipleCallbacks />
      <ComparisonDemo />
      <ListWithCallbacks />
    </div>
  );
}