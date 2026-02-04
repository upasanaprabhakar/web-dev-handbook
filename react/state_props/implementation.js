import { useState } from 'react';

// 1. Basic State - Counter
function BasicCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h3>1. Basic State - Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// 2. Multiple State Variables
function MultipleStates() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  
  return (
    <div>
      <h3>2. Multiple State Variables</h3>
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input 
        value={age}
        onChange={e => setAge(e.target.value)}
        placeholder="Enter age"
      />
      <input 
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <div>
        <p><strong>Name:</strong> {name || 'Not set'}</p>
        <p><strong>Age:</strong> {age || 'Not set'}</p>
        <p><strong>City:</strong> {city || 'Not set'}</p>
      </div>
    </div>
  );
}

// 3. State with Objects
function ObjectState() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 25,
    email: 'john@example.com'
  });
  
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  const updateAge = (newAge) => {
    setUser({ ...user, age: newAge });
  };
  
  return (
    <div>
      <h3>3. State with Objects</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <input 
        placeholder="Update name"
        onBlur={e => updateName(e.target.value)}
      />
      <input 
        type="number"
        placeholder="Update age"
        onBlur={e => updateAge(Number(e.target.value))}
      />
    </div>
  );
}

// 4. State with Arrays - Todo List
function TodoList() {
  const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog']);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <h3>4. State with Arrays - Todo List</h3>
      <input 
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Props - Parent to Child
function UserCard({ name, age, email, isActive }) {
  return (
    <div>
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isActive ? '🟢 Active' : '🔴 Inactive'}</p>
    </div>
  );
}

function ParentWithProps() {
  return (
    <div>
      <h3>5. Props - Parent to Child</h3>
      <UserCard 
        name="Alice Johnson"
        age={28}
        email="alice@example.com"
        isActive={true}
      />
      <UserCard 
        name="Bob Smith"
        age={35}
        email="bob@example.com"
        isActive={false}
      />
    </div>
  );
}

// 6. Default Props
function Greeting({ name = 'Guest', message = 'Welcome' }) {
  return (
    <div>
      <p>{message}, {name}!</p>
    </div>
  );
}

function DefaultPropsDemo() {
  return (
    <div>
      <h3>6. Default Props</h3>
      <Greeting />
      <Greeting name="John" />
      <Greeting name="Jane" message="Hello" />
    </div>
  );
}

// 7. Lifting State Up - Shared State
function TemperatureInput({ temperature, onTemperatureChange, scale }) {
  return (
    <div>
      <label>
        Enter temperature in {scale === 'c' ? 'Celsius' : 'Fahrenheit'}:
        <input 
          value={temperature}
          onChange={e => onTemperatureChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

function TemperatureConverter() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');
  
  const handleCelsiusChange = (temp) => {
    setTemperature(temp);
    setScale('c');
  };
  
  const handleFahrenheitChange = (temp) => {
    setTemperature(temp);
    setScale('f');
  };
  
  const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };
  
  const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };
  
  const celsius = scale === 'f' ? toCelsius(temperature) : temperature;
  const fahrenheit = scale === 'c' ? toFahrenheit(temperature) : temperature;
  
  return (
    <div>
      <h3>7. Lifting State Up - Temperature Converter</h3>
      <TemperatureInput 
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput 
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

// 8. Passing Functions as Props
function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  
  const handleSubmit = () => {
    if (itemName.trim()) {
      onAddItem(itemName);
      setItemName('');
    }
  };
  
  return (
    <div>
      <input 
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
}

function ItemList({ items, onRemoveItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => onRemoveItem(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

function ShoppingList() {
  const [items, setItems] = useState(['Milk', 'Bread']);
  
  const addItem = (itemName) => {
    setItems([...items, itemName]);
  };
  
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <h3>8. Passing Functions as Props</h3>
      <AddItemForm onAddItem={addItem} />
      <ItemList items={items} onRemoveItem={removeItem} />
    </div>
  );
}

// 9. Controlled Components
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: 'US',
    terms: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert(JSON.stringify(formData, null, 2));
  };
  
  return (
    <div>
      <h3>9. Controlled Components</h3>
      <input 
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input 
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <select 
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="IN">India</option>
      </select>
      <label>
        <input 
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
        />
        I agree to terms
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

// 10. Children Props
function Card({ children, title }) {
  return (
    <div>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function ChildrenPropsDemo() {
  return (
    <div>
      <h3>10. Children Props</h3>
      <Card title="Profile">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <button>Edit Profile</button>
      </Card>
      <Card title="Settings">
        <p>Theme: Dark</p>
        <p>Language: English</p>
        <button>Save Settings</button>
      </Card>
    </div>
  );
}

// 11. Derived State
function DerivedStateDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 79, quantity: 1 }
  ]);
  
  // Derived values - don't store in state
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };
  
  return (
    <div>
      <h3>11. Derived State (Calculated Values)</h3>
      {items.map(item => (
        <div key={item.id}>
          <p><strong>{item.name}</strong> - ${item.price}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>Qty: {item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      ))}
      <div>
        <p>Items: {itemCount}</p>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (18%): ${tax.toFixed(2)}</p>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

// 12. Functional State Updates
function FunctionalUpdates() {
  const [count, setCount] = useState(0);
  
  const incrementTwice = () => {
    // Wrong way - uses stale state
    setCount(count + 1);
    setCount(count + 1);
    // Only increments by 1!
  };
  
  const incrementTwiceCorrect = () => {
    // Correct way - functional update
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Increments by 2!
  };
  
  return (
    <div>
      <h3>12. Functional State Updates</h3>
      <p>Count: {count}</p>
      <button onClick={incrementTwice}>Increment Twice (Wrong - adds 1)</button>
      <button onClick={incrementTwiceCorrect}>Increment Twice (Correct - adds 2)</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div>
      <h1>State & Props Examples</h1>
      <BasicCounter />
      <MultipleStates />
      <ObjectState />
      <TodoList />
      <ParentWithProps />
      <DefaultPropsDemo />
      <TemperatureConverter />
      <ShoppingList />
      <ControlledForm />
      <ChildrenPropsDemo />
      <DerivedStateDemo />
      <FunctionalUpdates />
    </div>
  );
}