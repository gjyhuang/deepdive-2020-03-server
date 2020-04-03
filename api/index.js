var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use('/questions', require('./questions'));
router.use('/options', require('./options'));
router.use('/questionOptions', require('./questionOptions'));

module.exports = router;
