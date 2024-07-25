import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import Dashboard from './components/Dashboard';
import List from './components/List';
import Details from './components/Details';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { getUser } from './utils/auth';
import './App.css';
import Detail from './components/Detail';

const store = createStore(rootReducer);

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = getUser();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="*"
            element={
              <div className="app-container" style={{ display: 'flex' }}>
                <Topbar handleDrawerToggle={toggleSidebar} />
                <Sidebar
                  drawerWidth={240}
                  mobileOpen={isSidebarOpen}
                  handleDrawerToggle={toggleSidebar}
                />
                <main
                  className="main-content"
                  style={{
                    flexGrow: 1,
                    padding: '16px',
                    transition: 'margin-left 0.3s',
                    marginTop: '30px',
                    marginLeft: isSidebarOpen ? '240px' : '0',
                  }}
                >
                  <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/list" element={<ProtectedRoute element={<List />} />} />
                    <Route path="/details/:scanName" element={<Details />} />
                    <Route path="/details" element={<Detail />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
