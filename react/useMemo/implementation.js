import { useState, useMemo } from 'react';

// 1. Basic useMemo - Expensive Calculation
function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Simulating expensive calculation
  const expensiveResult = useMemo(() => {
    console.log('Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += count;
    }
    return result;
  }, [count]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>1. Expensive Calculation</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <br /><br />
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here (doesn't trigger calculation)"
      />
      <p>Result: {expensiveResult}</p>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Check console - calculation only runs when count changes
      </p>
    </div>
  );
}

// 2. Array Filtering - Without vs With useMemo
function ArrayFiltering() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [unrelatedState, setUnrelatedState] = useState(0);
  
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 },
    { id: 4, name: 'David', age: 28 },
    { id: 5, name: 'Eve', age: 35 },
    { id: 6, name: 'Frank', age: 27 }
  ];
  
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Filtering and sorting users...');
    return users
      .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
      });
  }, [searchTerm, sortOrder]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>2. Array Filtering & Sorting</h3>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
        style={{ marginRight: '10px' }}
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Age: Low to High</option>
        <option value="desc">Age: High to Low</option>
      </select>
      <br /><br />
      <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
        Unrelated State: {unrelatedState} (doesn't trigger filter)
      </button>
      <ul>
        {filteredAndSortedUsers.map(user => (
          <li key={user.id}>{user.name} - {user.age} years</li>
        ))}
      </ul>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Check console - only runs when search or sort changes
      </p>
    </div>
  );
}

// 3. Sum Calculation - Performance Demo
function SumCalculation() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [theme, setTheme] = useState('light');
  
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((total, num) => total + num, 0);
  }, [numbers]);
  
  const addNumber = () => {
    setNumbers([...numbers, Math.floor(Math.random() * 100)]);
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      marginBottom: '20px',
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <h3>3. Sum Calculation</h3>
      <p>Numbers: {numbers.join(', ')}</p>
      <p>Sum: {sum}</p>
      <button onClick={addNumber}>Add Random Number</button>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme (doesn't recalculate sum)
      </button>
    </div>
  );
}

// 4. Derived State - Statistics
function Statistics() {
  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const [inputValue, setInputValue] = useState('');
  
  const stats = useMemo(() => {
    console.log('Calculating statistics...');
    return {
      count: data.length,
      sum: data.reduce((acc, n) => acc + n, 0),
      average: data.reduce((acc, n) => acc + n, 0) / data.length,
      max: Math.max(...data),
      min: Math.min(...data)
    };
  }, [data]);
  
  const addData = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setData([...data, num]);
      setInputValue('');
    }
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>4. Statistics Calculator</h3>
      <p>Data: {data.join(', ')}</p>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '10px' }}>
        <p>Count: {stats.count}</p>
        <p>Sum: {stats.sum}</p>
        <p>Average: {stats.average.toFixed(2)}</p>
        <p>Max: {stats.max}</p>
        <p>Min: {stats.min}</p>
      </div>
      <input 
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter number"
      />
      <button onClick={addData}>Add Number</button>
    </div>
  );
}

// 5. Product Search & Filter
function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  
  const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
    { id: 3, name: 'Desk', price: 299, category: 'Furniture' },
    { id: 4, name: 'Chair', price: 199, category: 'Furniture' },
    { id: 5, name: 'Monitor', price: 399, category: 'Electronics' },
    { id: 6, name: 'Keyboard', price: 79, category: 'Electronics' },
    { id: 7, name: 'Lamp', price: 49, category: 'Furniture' }
  ];
  
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, categoryFilter, priceRange]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>5. Product Search & Filter</h3>
      <div style={{ marginBottom: '10px' }}>
        <input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          style={{ marginRight: '10px' }}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Max Price: ${priceRange}</label>
        <input 
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <p>Found {filteredProducts.length} products</p>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

// 6. Sorted Table
function SortedTable() {
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterActive, setFilterActive] = useState(false);
  
  const employees = [
    { id: 1, name: 'Alice', age: 28, department: 'Engineering', active: true },
    { id: 2, name: 'Bob', age: 35, department: 'Sales', active: false },
    { id: 3, name: 'Charlie', age: 22, department: 'Engineering', active: true },
    { id: 4, name: 'Diana', age: 30, department: 'Marketing', active: true },
    { id: 5, name: 'Eve', age: 26, department: 'Sales', active: false }
  ];
  
  const sortedEmployees = useMemo(() => {
    console.log('Sorting employees...');
    let filtered = filterActive ? employees.filter(e => e.active) : employees;
    
    return [...filtered].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [sortBy, sortDirection, filterActive]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>6. Sorted Table</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="department">Department</option>
        </select>
        <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
        <label style={{ marginLeft: '20px' }}>
          <input 
            type="checkbox"
            checked={filterActive}
            onChange={(e) => setFilterActive(e.target.checked)}
          />
          Active only
        </label>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map(emp => (
            <tr key={emp.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.age}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.department}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {emp.active ? '✓ Active' : '✗ Inactive'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 7. Shopping Cart Total
function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 79, quantity: 1 }
  ]);
  const [discountCode, setDiscountCode] = useState('');
  
  const cartSummary = useMemo(() => {
    console.log('Calculating cart summary...');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = discountCode === 'SAVE10' ? subtotal * 0.1 : 0;
    const tax = (subtotal - discount) * 0.18;
    const total = subtotal - discount + tax;
    
    return { subtotal, discount, tax, total };
  }, [cartItems, discountCode]);
  
  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>7. Shopping Cart Summary</h3>
      {cartItems.map(item => (
        <div key={item.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <p><strong>{item.name}</strong> - ${item.price}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span style={{ margin: '0 10px' }}>Quantity: {item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <p>Subtotal: ${item.price * item.quantity}</p>
        </div>
      ))}
      <input 
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
        placeholder="Discount code (try SAVE10)"
        style={{ marginTop: '10px' }}
      />
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e9' }}>
        <p>Subtotal: ${cartSummary.subtotal.toFixed(2)}</p>
        <p>Discount: -${cartSummary.discount.toFixed(2)}</p>
        <p>Tax (18%): ${cartSummary.tax.toFixed(2)}</p>
        <p><strong>Total: ${cartSummary.total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

// 8. Comparison: With vs Without useMemo
function UseMemoComparison() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  
  // Without useMemo - recalculates every render
  const withoutMemo = () => {
    console.log('Without useMemo: calculating...');
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += count;
    }
    return result;
  };
  
  // With useMemo - only recalculates when count changes
  const withMemo = useMemo(() => {
    console.log('With useMemo: calculating...');
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += count;
    }
    return result;
  }, [count]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>8. Comparison: With vs Without useMemo</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <br /><br />
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here and watch console"
      />
      <p>Result with useMemo: {withMemo}</p>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Check console: useMemo version only recalculates when count changes,
        not when you type
      </p>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>useMemo Hook Examples</h1>
      <ExpensiveCalculation />
      <ArrayFiltering />
      <SumCalculation />
      <Statistics />
      <ProductSearch />
      <SortedTable />
      <ShoppingCart />
      <UseMemoComparison />
    </div>
  );
}