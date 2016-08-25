'use stict';

const express = require('express');
const router = express.Router();

router.get('/heartbeat', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
