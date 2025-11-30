# Resend Node.js Email Server

A deployable Node.js Express server that demonstrates sending emails to two different addresses using Resend API.

## Features

- 🚀 Express server with RESTful API endpoints
- 📧 Send emails to two different addresses using separate Resend API keys
- 🔒 Environment variable configuration for API keys
- ✅ Health check endpoint
- 🎯 TypeScript support

## Prerequisites

To get the most out of this guide, you'll need to:

* [Create API keys](https://resend.com/api-keys) - You'll need two API keys
* [Verify your domains](https://resend.com/domains)

## Setup

1. **Clone and install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment variables:**

   Copy `.env.example` to `.env` and fill in your API keys:

   ```sh
   cp .env.example .env
   ```

   Edit `.env` with your actual values:
   ```
   RESEND_API_KEY_1=re_your_first_api_key
   RESEND_API_KEY_2=re_your_second_api_key
   FROM_EMAIL_1=Your Name <noreply@yourdomain.com>
   FROM_EMAIL_2=Your Name <noreply@yourdomain2.com>
   PORT=3000
   ```

## Development

Run the development server with hot reload:

```sh
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

### Send Email to First Address
```
POST /api/send-email-1
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "html": "<p>Your HTML content</p>"
}
```

### Send Email to Second Address
```
POST /api/send-email-2
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "html": "<p>Your HTML content</p>"
}
```

### Send Emails to Both Addresses
```
POST /api/send-emails-both
Content-Type: application/json

{
  "to1": "recipient1@example.com",
  "to2": "recipient2@example.com",
  "subject1": "Email 1 Subject",
  "subject2": "Email 2 Subject",
  "html1": "<p>Email 1 content</p>",
  "html2": "<p>Email 2 content</p>"
}
```

## Production Deployment

1. **Build the project:**

   ```sh
   npm run build
   ```

2. **Start the production server:**

   ```sh
   npm start
   ```

3. **Set environment variables** on your hosting platform (Heroku, Railway, Render, etc.)

## Example Usage

Using curl:

```bash
# Send email to first address
curl -X POST http://localhost:3000/api/send-email-1 \
  -H "Content-Type: application/json" \
  -d '{
    "to": "tannigupta31@gmail.com",
    "subject": "Welcome to Kramaankh!",
    "html": "<strong>Kya haal tanishq bhai?</strong>"
  }'

# Send email to second address
curl -X POST http://localhost:3000/api/send-email-2 \
  -H "Content-Type: application/json" \
  -d '{
    "to": "faisalhusain1320@gmail.com",
    "subject": "Welcome to UICraft!",
    "html": "<strong>Kya haal faisal bhai?</strong>"
  }'
```

## License

MIT License
