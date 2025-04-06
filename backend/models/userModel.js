const users = [];

const findUserByEmailOrUsername = (identifier) => {
  return users.find(u => u.email === identifier || u.username === identifier);
};

const createUser = (data) => {
  users.push(data);
  return data;
};

module.exports = {
  users,
  findUserByEmailOrUsername,
  createUser
};
