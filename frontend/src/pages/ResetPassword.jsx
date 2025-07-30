import { useState } from 'react';
import { supabase } from '../supabase';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password'
    });
    setMessage(error ? error.message : 'Password reset email sent!');
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
    </form>
  );
}
