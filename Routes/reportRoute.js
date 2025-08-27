
const express = require('express');
const { submitReport, viewReport, Update, reportsearch, report } = require('../Controller/reportController');
const { authorization } = require('../middleware/authirization');


const router = express.Router();

router.route('/submit').post(authorization,submitReport)
router.get('/view', viewReport);
router.put('/update', Update);
router.route('/search').post(reportsearch)
router.route('/details/:id').get(report)


module.exports = router;


