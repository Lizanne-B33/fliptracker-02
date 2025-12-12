import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PersistLogin from './components/PersistLogin';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CustomNavbar from './components/CustomNavbar';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import User from './pages/auth/User';
import ProductFastPage from './pages/inventory/ProductFastPage';
import ProductPage from './pages/inventory/ProductPage';
import ProductTypePage from './pages/inventory/ProductTypePage';
import CategoryPage from './pages/inventory/CategoryPage';
import ProductInsightsPage from './pages/insights/ProductInsightsPage';
import ProductForm from './components/inventory/ProductForm';
import ProductAddPage from './pages/inventory/ProductAddPage';
import ReadyToListReportPage from './pages/insights/ReadyToListReportPage';
import ProfitByMonthReport from './pages/insights/ProfitByMonthReport';

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
              {/* Add more user routes here if needed */}
            </Route>

            {/* Product Add/Edit top-level routes */}
            <Route path="/products/new" element={<ProductAddPage />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />

            {/* Inventory section (nested routes) */}
            <Route path="/inventory" element={<Outlet />}>
              <Route path="fast-add" element={<ProductFastPage />} />
              <Route path="product-type" element={<ProductTypePage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="product" element={<ProductPage />} />
            </Route>
          </Route>
        </Route>

        {/* Insights section (top-level) */}
        <Route
          path="/insights/ready-report"
          element={<ReadyToListReportPage />}
        />
        <Route
          path="/insights/profit-by-month"
          element={<ProfitByMonthReport />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
