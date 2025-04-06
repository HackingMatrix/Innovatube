const favorites = []; // Aquí se guarda todo temporalmente

const getFavoritesByUser = (username) => {
  return favorites.filter(f => f.username === username);
};

const addFavorite = (username, video) => {
  const exists = favorites.find(f => f.username === username && f.videoId === video.videoId);
  if (!exists) {
    favorites.push({ username, ...video });
  }
};

const removeFavorite = (username, videoId) => {
  const index = favorites.findIndex(f => f.username === username && f.videoId === videoId);
  if (index !== -1) {
    favorites.splice(index, 1);
  }
};

module.exports = { getFavoritesByUser, addFavorite, removeFavorite };
