// src/hooks/useMailchimpForm.js
import { useState } from 'react';

const useMailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState({ submitting: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, message: '' });

    try {
      // We send the request to our Vercel Serverless Function
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      
      setFormStatus({ submitting: false, message: 'Success! Please check your email to confirm.' });
      setEmail(''); // Clear the input on success
    } catch (error) {
      // It's good practice to check if the user is already subscribed
      if (error.message.includes('Member Exists')) {
        setFormStatus({ submitting: false, message: 'You are already subscribed!' });
      } else {
        setFormStatus({ submitting: false, message: error.message });
      }
    }
  };

  // We return the state and functions for the component to use
  return {
    email,
    setEmail,
    formStatus,
    handleSubmit,
  };
};

export default useMailchimpForm;