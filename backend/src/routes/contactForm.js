const express = require('express');
const router = express.Router();
const EmailSender = require('../services/email');

router.post('/send', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailSender = new EmailSender({
      to: 'sandeeprickysingh1976@gmail.com',
      subject: subject,
      html: () => `
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      text: () => `From: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    await emailSender.send();
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;
