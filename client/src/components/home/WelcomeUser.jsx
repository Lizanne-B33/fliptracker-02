import useAuth from '../hooks/useAuth';

function Dashboard() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <p>Please log in</p>;
  return <h2>Welcome back, {user.first_name}</h2>;
}
