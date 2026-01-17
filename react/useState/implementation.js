import { useState } from 'react';

// 1. Basic counter
function BasicCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Basic Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// 2. Boolean toggle
function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div>
      <h2>Toggle Switch</h2>
      <p>The switch is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        Toggle
      </button>
    </div>
  );
}

// 3. Text input (controlled component)
function TextInput() {
  const [text, setText] = useState('');
  
  return (
    <div>
      <h2>Text Input</h2>
      <input 
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <p>Length: {text.length} characters</p>
    </div>
  );
}

// 4. Multiple state variables
function MultipleStates() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <div>
      <h2>Multiple States</h2>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div>
        <h3>Summary:</h3>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}

// 5. Object state
function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });
  
  function updateField(field, value) {
    setUser({
      ...user,
      [field]: value
    });
  }
  
  return (
    <div>
      <h2>User Profile (Object State)</h2>
      <input 
        value={user.firstName}
        onChange={(e) => updateField('firstName', e.target.value)}
        placeholder="First Name"
      />
      <input 
        value={user.lastName}
        onChange={(e) => updateField('lastName', e.target.value)}
        placeholder="Last Name"
      />
      <input 
        value={user.age}
        onChange={(e) => updateField('age', e.target.value)}
        placeholder="Age"
      />
      <p>Full Name: {user.firstName} {user.lastName}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

// 6. Array state - todo list
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  function addTodo() {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  }
  
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  return (
    <div>
      <h2>Todo List (Array State)</h2>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total todos: {todos.length}</p>
    </div>
  );
}

// 7. Functional update
function FunctionalUpdate() {
  const [count, setCount] = useState(0);
  
  function incrementTwice() {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  }
  
  return (
    <div>
      <h2>Functional Update</h2>
      <p>Count: {count}</p>
      <button onClick={incrementTwice}>Increment by 2</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// 8. Show/Hide content
function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <h2>Accordion</h2>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide' : 'Show'} Content
      </button>
      {isOpen && (
        <div style={{ padding: '10px', border: '1px solid #ccc' }}>
          <p>This is the hidden content!</p>
          <p>It only shows when isOpen is true.</p>
        </div>
      )}
    </div>
  );
}

// 9. Counter with step
function CounterWithStep() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  return (
    <div>
      <h2>Counter with Step</h2>
      <p>Count: {count}</p>
      <p>Step: {step}</p>
      
      <input 
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      
      <button onClick={() => setCount(count + step)}>
        Increment by {step}
      </button>
      <button onClick={() => setCount(count - step)}>
        Decrement by {step}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// 10. Form submission
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  function handleChange(field, value) {
    setFormData({
      ...formData,
      [field]: value
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  }
  
  return (
    <div>
      <h2>Contact Form</h2>
      {submitted ? (
        <p>Thank you! Form submitted successfully.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Name"
            required
          />
          <input 
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <textarea 
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Message"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

// 11. Shopping cart
function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 2, quantity: 0 },
    { id: 2, name: 'Banana', price: 1, quantity: 0 },
    { id: 3, name: 'Orange', price: 3, quantity: 0 }
  ]);
  
  function updateQuantity(id, change) {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ));
  }
  
  const total = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
}

// 12. Dark mode toggle
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  const styles = {
    container: {
      padding: '20px',
      background: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
      minHeight: '200px'
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Dark Mode Toggle</h2>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
      <p>This is some sample content.</p>
      <p>Current mode: {isDark ? 'Dark' : 'Light'}</p>
    </div>
  );
}

// 13. Character counter
function CharacterCounter() {
  const [text, setText] = useState('');
  const maxLength = 100;
  
  const remaining = maxLength - text.length;
  const isOverLimit = remaining < 0;
  
  return (
    <div>
      <h2>Character Counter</h2>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        rows="4"
        cols="50"
      />
      <p style={{ color: isOverLimit ? 'red' : 'black' }}>
        {remaining} characters remaining
      </p>
      {isOverLimit && <p>You've exceeded the character limit!</p>}
    </div>
  );
}

// 14. Multi-step form
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  function nextStep() {
    setStep(step + 1);
  }
  
  function prevStep() {
    setStep(step - 1);
  }
  
  function handleChange(field, value) {
    setFormData({ ...formData, [field]: value });
  }
  
  return (
    <div>
      <h2>Multi-Step Form</h2>
      <p>Step {step} of 3</p>
      
      {step === 1 && (
        <div>
          <input 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Name"
          />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <input 
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <input 
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Phone"
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={() => console.log('Submitted:', formData)}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

// 15. Like button
function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  function handleLike() {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  }
  
  return (
    <div>
      <h2>Like Button</h2>
      <button 
        onClick={handleLike}
        style={{ 
          background: isLiked ? '#ff4444' : '#ccc',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {isLiked ? '❤️ Liked' : '🤍 Like'}
      </button>
      <p>{likes} {likes === 1 ? 'like' : 'likes'}</p>
    </div>
  );
}

// Main App component to render all examples
export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>useState Hook Examples</h1>
      <hr />
      <BasicCounter />
      <hr />
      <ToggleSwitch />
      <hr />
      <TextInput />
      <hr />
      <MultipleStates />
      <hr />
      <UserProfile />
      <hr />
      <TodoList />
      <hr />
      <FunctionalUpdate />
      <hr />
      <Accordion />
      <hr />
      <CounterWithStep />
      <hr />
      <ContactForm />
      <hr />
      <ShoppingCart />
      <hr />
      <DarkModeToggle />
      <hr />
      <CharacterCounter />
      <hr />
      <MultiStepForm />
      <hr />
      <LikeButton />
    </div>
  );
}