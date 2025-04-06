const express = require('express');
const router = express.Router();
const { getFavorites, saveFavorite, deleteFavorite } = require('../controllers/favoriteController');

router.get('/:username', getFavorites);
router.post('/', saveFavorite);
router.delete('/', deleteFavorite);

module.exports = router;
