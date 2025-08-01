// Quick script to clear authentication from localStorage
// Run this in browser console: localStorage.removeItem('isAdminAuthenticated')

console.log('Current auth status:', localStorage.getItem('isAdminAuthenticated'));
localStorage.removeItem('isAdminAuthenticated');
console.log('Auth cleared. Refresh the page.');