const { getFavoritesByUser, addFavorite, removeFavorite } = require('../models/favoriteModel');

const getFavorites = (req, res) => {
  const { username } = req.params;
  const userFavorites = getFavoritesByUser(username);
  res.json(userFavorites);
};

const saveFavorite = (req, res) => {
  const { username, videoId, title, thumbnail, channelTitle } = req.body;
  addFavorite(username, { videoId, title, thumbnail, channelTitle });
  res.status(201).json({ message: 'Favorito guardado' });
};

const deleteFavorite = (req, res) => {
  const { username, videoId } = req.body;
  removeFavorite(username, videoId);
  res.json({ message: 'Favorito eliminado' });
};

module.exports = { getFavorites, saveFavorite, deleteFavorite };
