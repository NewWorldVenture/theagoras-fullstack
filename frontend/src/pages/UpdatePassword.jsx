import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? error.message : 'Password updated!');
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = '/login';
      }
    });
  }, []);

  return (
    <form onSubmit={handleUpdate}>
      <h2>Set New Password</h2>
      <input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Update Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}
