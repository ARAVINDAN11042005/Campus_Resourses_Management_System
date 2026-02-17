const express = require('express');
const router = express.Router();
const issuanceController = require('../controllers/issuanceController');

router.get('/', issuanceController.getIssuances);
router.post('/issue', issuanceController.issueResource);
router.put('/return/:id', issuanceController.returnResource);

module.exports = router;
