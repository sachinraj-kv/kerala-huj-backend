const express = require('express');
const { user_data, cov_search, user_pages_data } = require('../Controller/userController');

const router = express.Router();

router.route('/users').get(user_data)
router.route('/pagesdata').get(user_pages_data)
router.route('/search').post(cov_search)

module.exports = router;

