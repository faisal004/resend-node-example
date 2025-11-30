import express, { Request, Response } from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend clients
const resend1 = new Resend(process.env.RESEND_API_KEY_1);
const resend2 = new Resend(process.env.RESEND_API_KEY_2);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Endpoint to send email to first address
app.post('/api/send-email-1', async (req: Request, res: Response) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, subject, html' 
      });
    }

    const data = await resend1.emails.send({
      from: process.env.FROM_EMAIL_1 || 'Kramaankh <noreply@kramaankh.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    });

    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to send email' 
    });
  }
});

// Endpoint to send email to second address
app.post('/api/send-email-2', async (req: Request, res: Response) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, subject, html' 
      });
    }

    const data = await resend2.emails.send({
      from: process.env.FROM_EMAIL_2 || 'UICraft <noreply@uicraft.in>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    });

    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to send email' 
    });
  }
});

// Endpoint to send emails to both addresses
app.post('/api/send-emails-both', async (req: Request, res: Response) => {
  try {
    const { to1, to2, subject1, subject2, html1, html2 } = req.body;

    if (!to1 || !to2 || !subject1 || !subject2 || !html1 || !html2) {
      return res.status(400).json({ 
        error: 'Missing required fields: to1, to2, subject1, subject2, html1, html2' 
      });
    }

    const [data1, data2] = await Promise.all([
      resend1.emails.send({
        from: process.env.FROM_EMAIL_1 || 'Kramaankh <noreply@kramaankh.com>',
        to: Array.isArray(to1) ? to1 : [to1],
        subject: subject1,
        html: html1
      }),
      resend2.emails.send({
        from: process.env.FROM_EMAIL_2 || 'UICraft <noreply@uicraft.in>',
        to: Array.isArray(to2) ? to2 : [to2],
        subject: subject2,
        html: html2
      })
    ]);

    res.json({ 
      success: true, 
      message: 'Both emails sent successfully',
      data: { email1: data1, email2: data2 }
    });
  } catch (error: any) {
    console.error('Error sending emails:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to send emails' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoints available:`);
  console.log(`   POST /api/send-email-1`);
  console.log(`   POST /api/send-email-2`);
  console.log(`   POST /api/send-emails-both`);
});

