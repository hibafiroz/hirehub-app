const express = require("express");
const router = express.Router()
const { sendEmail } = require("../utils/email");

router.get("/", async (req, res) => {
  try {
    await sendEmail();
    res.send("Email sent");
  } catch (err) {
    console.log(err);
    res.send("Error sending email");
  }
});

module.exports = router