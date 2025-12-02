// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { Routes, Route, Navigate } from 'react-router-dom';
import PersistLogin from './components/PersistLogin';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home';
import User from './pages/auth/User';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <>
      <CustomNavbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected routes wrapped with PersistLogin */}
        <Route element={<PersistLogin />}>
          <Route path="/user" element={<AuthMiddleware />}>
            <Route index element={<User />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
