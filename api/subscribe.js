// /api/subscribe.js

export default async function handler(req, res) {
  // Log the moment the function is triggered
  console.log('--- Subscribe function invoked ---');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;
  console.log('Received email:', email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Explicitly log each environment variable to see its value
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  console.log('MAILCHIMP_API_KEY value:', API_KEY ? 'Set' : 'NOT SET');

  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  console.log('MAILCHIMP_API_SERVER value:', API_SERVER ? API_SERVER : 'NOT SET');

  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  console.log('MAILCHIMP_AUDIENCE_ID value:', AUDIENCE_ID ? 'Set' : 'NOT SET');

  if (!API_KEY || !API_SERVER || !AUDIENCE_ID) {
    console.error("CRASH AVOIDED: One or more Mailchimp environment variables are missing.");
    return res.status(500).json({ error: 'Server configuration error. Critical variables are missing.' });
  }

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  console.log('Constructed Mailchimp URL:', url);
  
  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    console.log('Attempting to fetch Mailchimp API...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });
    
    console.log('Mailchimp response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mailchimp API error:', errorData);
      if (errorData.title === 'Member Exists') {
        return res.status(400).json({ error: 'This email is already subscribed!' });
      }
      return res.status(500).json({ error: errorData.title || 'An error occurred.' });
    }

    console.log('Successfully subscribed!');
    return res.status(201).json({ message: 'Success! You are now subscribed.' });

  } catch (error) {
    console.error('CRITICAL ERROR in fetch block:', error);
    return res.status(500).json({ error: 'A critical server error occurred.' });
  }
}
