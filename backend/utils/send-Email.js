const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.USER_PASS
      }
    })

    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })

    console.log('Email sent successfully')
  } catch (error) {
    console.log('Email error:', error.message)
  }
}

module.exports = sendEmail
