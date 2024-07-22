import Cookies from 'js-cookie';

export const login = (userData) => {
  // Set user data in cookies
  Cookies.set('user', JSON.stringify(userData), { expires: 1 }); // Cookie expires in 1 day
};

export const logout = () => {
  // Clear user data from cookies
  Cookies.remove('user');
};

export const isAuthenticated = () => {
  // Check if user data is stored in cookies
  return !!Cookies.get('user');
};

export const getUser = () => {
  // Get user data from cookies
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};
