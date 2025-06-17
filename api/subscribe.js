// /api/subscribe.js (for Vercel) or /netlify/functions/subscribe.js (for Netlify)

export default async function handler(req, res) {
  // 1. We only want to handle POST requests.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // 2. Get the email from the request body.
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // 3. Get our secret variables from the environment.
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  // 4. Construct the Mailchimp API URL.
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  // 5. Set up the subscriber data.
  const data = {
    email_address: email,
    status: 'subscribed',
  };

  // 6. Send the request to Mailchimp.
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The API key is encoded in Base64 for Basic authentication.
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    // 7. If Mailchimp returns an error, forward it to our frontend.
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData.title || 'Something went wrong.' });
    }

    // 8. If successful, send a success response.
    return res.status(201).json({ message: 'Success! You are now subscribed.' });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'An unexpected error occurred.' });
  }
}