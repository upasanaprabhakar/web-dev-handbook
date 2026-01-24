import { createContext, useContext, useState, useMemo } from 'react';

// 1. Basic Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function BasicThemeExample() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{
      padding: '20px',
      background: theme === 'dark' ? '#333' : '#f0f0f0',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h2>Basic Theme Context</h2>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// 2. User Authentication Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (username) => {
    setUser({ name: username, role: 'user' });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user
  }), [user]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function AuthExample() {
  const { user, login, logout, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Authentication Context</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={() => login(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

// 3. Shopping Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const total = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    itemCount: items.length
  }), [items, total]);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function CartExample() {
  const { items, addItem, removeItem, updateQuantity, total, itemCount } = useContext(CartContext);
  
  const products = [
    { id: 1, name: 'Apple', price: 2 },
    { id: 2, name: 'Banana', price: 1 },
    { id: 3, name: 'Orange', price: 3 }
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart Context</h2>
      
      <h3>Products</h3>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: '10px' }}>
          {product.name} - ${product.price}
          <button onClick={() => addItem(product)}>Add to Cart</button>
        </div>
      ))}
      
      <h3>Cart ({itemCount} items)</h3>
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          {item.name} - ${item.price} x 
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          {item.quantity}
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      
      <h3>Total: ${total}</h3>
    </div>
  );
}

// 4. Language Context
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: {
      welcome: 'Welcome',
      greeting: 'Hello',
      goodbye: 'Goodbye'
    },
    es: {
      welcome: 'Bienvenido',
      greeting: 'Hola',
      goodbye: 'Adiós'
    },
    fr: {
      welcome: 'Bienvenue',
      greeting: 'Bonjour',
      goodbye: 'Au revoir'
    }
  };
  
  const t = (key) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function LanguageExample() {
  const { language, setLanguage, t } = useContext(LanguageContext);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Language Context</h2>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      
      <p>{t('welcome')}!</p>
      <p>{t('greeting')}</p>
      <p>{t('goodbye')}</p>
    </div>
  );
}

// 5. Settings Context
const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    fontSize: 'medium'
  });
  
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const value = useMemo(() => ({
    settings,
    updateSetting
  }), [settings]);
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

function SettingsExample() {
  const { settings, updateSetting } = useContext(SettingsContext);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings Context</h2>
      
      <label>
        <input 
          type="checkbox"
          checked={settings.notifications}
          onChange={(e) => updateSetting('notifications', e.target.checked)}
        />
        Enable Notifications
      </label>
      
      <br />
      
      <label>
        <input 
          type="checkbox"
          checked={settings.darkMode}
          onChange={(e) => updateSetting('darkMode', e.target.checked)}
        />
        Dark Mode
      </label>
      
      <br />
      
      <label>
        Font Size: 
        <select 
          value={settings.fontSize}
          onChange={(e) => updateSetting('fontSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      
      <h3>Current Settings:</h3>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}

// 6. Todo Context with multiple components
const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const value = useMemo(() => ({
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }), [todos]);
  
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoInput() {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);
  
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <li key={todo.id} style={{ marginBottom: '8px' }}>
          <input 
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            marginLeft: '8px'
          }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function TodoStats() {
  const { todos } = useContext(TodoContext);
  
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  
  return (
    <div>
      <p>Completed: {completed} / {total}</p>
    </div>
  );
}

function TodoExample() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Todo Context (Multiple Components)</h2>
      <TodoInput />
      <TodoList />
      <TodoStats />
    </div>
  );
}

// 7. Multiple Contexts Combined
const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ name: 'John', role: 'admin' });
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

function MultipleContextsExample() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  
  return (
    <div style={{
      padding: '20px',
      background: theme === 'dark' ? '#444' : '#f5f5f5',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h2>Multiple Contexts</h2>
      <p>User: {currentUser.name}</p>
      <p>Role: {currentUser.role}</p>
      <p>Theme: {theme}</p>
    </div>
  );
}

// Main App with all context providers
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <SettingsProvider>
              <TodoProvider>
                <UserProvider>
                  <div style={{ padding: '20px' }}>
                    <h1>useContext Hook Examples</h1>
                    <hr />
                    <BasicThemeExample />
                    <hr />
                    <AuthExample />
                    <hr />
                    <CartExample />
                    <hr />
                    <LanguageExample />
                    <hr />
                    <SettingsExample />
                    <hr />
                    <TodoExample />
                    <hr />
                    <MultipleContextsExample />
                  </div>
                </UserProvider>
              </TodoProvider>
            </SettingsProvider>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}