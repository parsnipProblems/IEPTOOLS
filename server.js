require('dotenv').config();
const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Create a transporter object

// App
const app = express();

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
  
});

app.post('/send-email', async (req, res) => {
   const { name, email, subject, message } = req.body;

     if (!name || !email || !subject || !message) {
       return res.status(400).json({ status: 'error', message: 'Missing required fields!' })
   }

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ieptools06@gmail.com',
    pass: 'autgftfedwitcyas'
  }
});


// Configure the mailoptions object
const mailOptions = {
  from: "ieptools06@gmail.com",
  to: "natanisack16@gmail.com",
  subject: subject,
  text: `From: ${name}\nEmail:${email}\n\n${message}`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) =>{
  if (error) {
    console.log('Error:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to send email due to server error.' });
  } else {
    console.log('Email sent: ' + info.response);
    return res.status(200).json({
               status: 'success',
               message: 'Email successfully sent'
           });
  }
});
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);