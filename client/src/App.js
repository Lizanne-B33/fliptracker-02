import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PersistLogin from './components/PersistLogin';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CustomNavbar from './components/CustomNavbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductFastPage from './pages/inventory/ProductFastPage';
import ProductPage from './pages/inventory/ProductPage';
import ProductTypePage from './pages/inventory/ProductTypePage';
import CategoryPage from './pages/inventory/CategoryPage';
import User from './pages/auth/User';

function App() {
  return (
    <>
      {/* Global navbar always visible */}
      <CustomNavbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<AuthMiddleware />}>
            {/* User section */}
            <Route path="/user" element={<Outlet />}>
              <Route index element={<User />} />
              {/* add more user routes here */}
            </Route>

            {/* Inventory section */}
            <Route path="/inventory" element={<Outlet />}>
              <Route path="fast-add" element={<ProductFastPage />} />
              <Route path="product-type" element={<ProductTypePage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="product" element={<ProductPage />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
