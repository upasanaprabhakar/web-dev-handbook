// Sample data for examples
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 22, active: true },
  { id: 4, name: 'Alice', age: 28, active: true }
];

const products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 500, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 300, category: 'Furniture' },
  { id: 4, name: 'Chair', price: 150, category: 'Furniture' }
];

// 1. map() - Transform each item
const doubled = numbers.map(n => n * 2);
// console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

const userNames = users.map(user => user.name);
// console.log(userNames); // ['John', 'Jane', 'Bob', 'Alice']

// Create new objects with additional properties
const usersWithStatus = users.map(user => ({
  ...user,
  status: user.active ? 'Active' : 'Inactive'
}));
// console.log(usersWithStatus);

// 2. filter() - Keep items that match condition
const evens = numbers.filter(n => n % 2 === 0);
// console.log(evens); // [2, 4, 6, 8, 10]

const activeUsers = users.filter(user => user.active);
// console.log(activeUsers); // John, Bob, Alice

const adults = users.filter(user => user.age >= 25);
// console.log(adults); // John, Jane, Alice

// 3. reduce() - Combine into single value
const sum = numbers.reduce((total, num) => total + num, 0);
// console.log(sum); // 55

const totalAge = users.reduce((sum, user) => sum + user.age, 0);
// console.log(totalAge); // 105

// Count active users
const activeCount = users.reduce((count, user) => {
  return user.active ? count + 1 : count;
}, 0);
// console.log(activeCount); // 3

// Build an object from array
const userById = users.reduce((obj, user) => {
  obj[user.id] = user;
  return obj;
}, {});
// console.log(userById); // {1: {John}, 2: {Jane}, ...}

// 4. find() - Get first matching item
const user = users.find(u => u.id === 3);
// console.log(user); // Bob

const expensiveProduct = products.find(p => p.price > 400);
// console.log(expensiveProduct); // Laptop

// 5. some() - Check if at least one matches
const hasAdult = users.some(user => user.age >= 18);
// console.log(hasAdult); // true

const hasExpensive = products.some(p => p.price > 2000);
// console.log(hasExpensive); // false

// 6. every() - Check if all match
const allAdults = users.every(user => user.age >= 18);
// console.log(allAdults); // true

const allActive = users.every(user => user.active);
// console.log(allActive); // false

// 7. forEach() - Do something with each item (no return value)
users.forEach(user => {
  // console.log(`${user.name} is ${user.age} years old`);
});

// 8. includes() - Check if value exists
const hasNumber5 = numbers.includes(5);
// console.log(hasNumber5); // true

const names = ['John', 'Jane', 'Bob'];
const hasAlice = names.includes('Alice');
// console.log(hasAlice); // false

// 9. Method chaining - Combine multiple operations
const result = numbers
  .filter(n => n > 5)        // [6, 7, 8, 9, 10]
  .map(n => n * 2)           // [12, 14, 16, 18, 20]
  .reduce((sum, n) => sum + n, 0); // 80

// console.log(result); // 80

// Real-world chaining example
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
// console.log(activeUserNames); // ['John', 'Bob', 'Alice']

// 10. Practical: Calculate total price by category
const totalByCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = 0;
  }
  acc[product.category] += product.price;
  return acc;
}, {});
// console.log(totalByCategory); // {Electronics: 1500, Furniture: 450}

// 11. Practical: Group items by property
const usersByAge = users.reduce((grouped, user) => {
  const ageGroup = user.age >= 25 ? '25+' : 'Under 25';
  if (!grouped[ageGroup]) {
    grouped[ageGroup] = [];
  }
  grouped[ageGroup].push(user.name);
  return grouped;
}, {});
// console.log(usersByAge); // {'25+': ['John', 'Jane', 'Alice'], 'Under 25': ['Bob']}

// 12. Practical: Get unique values
const categories = products.map(p => p.category);
const uniqueCategories = [...new Set(categories)];
// console.log(uniqueCategories); // ['Electronics', 'Furniture']

// 13. Practical: Sort and transform
const sortedPrices = products
  .sort((a, b) => b.price - a.price)  // Sort by price descending
  .map(p => p.price);
// console.log(sortedPrices); // [1000, 500, 300, 150]

// 14. Practical: Find and update
const updatedUsers = users.map(user => {
  if (user.id === 2) {
    return { ...user, active: true }; // Update Jane to active
  }
  return user;
});
// console.log(updatedUsers);

// 15. Practical: Filter multiple conditions
const filteredProducts = products.filter(p => {
  return p.category === 'Electronics' && p.price < 600;
});
// console.log(filteredProducts); // Phone

// 16. Practical: Calculate average
const averageAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
// console.log(averageAge); // 26.25

// 17. Practical: Find min and max
const prices = products.map(p => p.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
// console.log(minPrice, maxPrice); // 150, 1000

// Using reduce for min/max
const maxPriceReduce = products.reduce((max, product) => {
  return product.price > max ? product.price : max;
}, 0);
// console.log(maxPriceReduce); // 1000

// 18. Practical: Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.flat();
// console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Or with flatMap
const numbersFlat = [1, 2, 3];
const doubledFlat = numbersFlat.flatMap(n => [n, n * 2]);
// console.log(doubledFlat); // [1, 2, 2, 4, 3, 6]

// 19. Practical: Remove items by condition
const withoutBob = users.filter(user => user.name !== 'Bob');
// console.log(withoutBob); // All except Bob

// 20. Practical: Check if array is empty after filtering
const expensiveProducts = products.filter(p => p.price > 5000);
if (expensiveProducts.length === 0) {
  // console.log('No expensive products found');
}

// 21. Real-world: Shopping cart total
const cart = [
  { item: 'Laptop', price: 1000, quantity: 1 },
  { item: 'Mouse', price: 25, quantity: 2 },
  { item: 'Keyboard', price: 75, quantity: 1 }
];

const cartTotal = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
// console.log(cartTotal); // 1125

// 22. Real-world: Search and filter
function searchUsers(query) {
  return users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase())
  );
}
// console.log(searchUsers('jo')); // John

// 23. Real-world: Pagination
function paginateArray(array, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}
// console.log(paginateArray(numbers, 2, 3)); // [4, 5, 6]

// 24. Combining everything - Complex example
const report = products
  .filter(p => p.category === 'Electronics')
  .map(p => ({
    name: p.name,
    price: p.price,
    discount: p.price * 0.1
  }))
  .reduce((acc, item) => {
    acc.totalPrice += item.price;
    acc.totalDiscount += item.discount;
    acc.items.push(item);
    return acc;
  }, { totalPrice: 0, totalDiscount: 0, items: [] });

// console.log(report);

console.log('\n=== Array Methods Examples ===');
console.log('Uncomment any line to see the output\n');