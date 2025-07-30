import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      <Link to="/browse">Browse</Link>{" "}
      {user && <Link to="/create-listing">Create Listing</Link>}{" "}
      {user && <Link to="/dashboard">Dashboard</Link>}{" "}
      {user && <Link to="/profile">My Account</Link>}{" "}
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Log In</Link>{" "}
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
