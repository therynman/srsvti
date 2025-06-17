// /api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // --- START OF NEW, ROBUST CHECKS ---

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  // Check if all required environment variables are set on Vercel
  if (!API_KEY || !API_SERVER || !AUDIENCE_ID) {
    console.error("One or more Mailchimp environment variables are not set.");
    return res.status(500).json({ error: 'Server configuration error. Please contact the administrator.' });
  }

  // --- END OF NEW CHECKS ---

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Provide a more user-friendly message for common errors
      if (errorData.title === 'Member Exists') {
        return res.status(400).json({ error: 'You are already subscribed!' });
      }
      // Forward other errors from Mailchimp
      return res.status(500).json({ error: errorData.title || 'An error occurred with the subscription service.' });
    }

    return res.status(201).json({ message: 'Success! You are now subscribed.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An unexpected error occurred while contacting the subscription service.' });
  }
}
