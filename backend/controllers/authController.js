const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmailOrUsername, createUser } = require('../models/userModel');

const register = async (req, res) => {
    console.log('Cuerpo recibido:', req.body); // <-- ayuda para debug
  const { fullName, username, email, password } = req.body;

  const existing = findUserByEmailOrUsername(email) || findUserByEmailOrUsername(username);
  if (existing) return res.status(400).json({ message: 'Usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({ fullName, username, email, password: hashedPassword });
  
  res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = findUserByEmailOrUsername(identifier);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ message: 'Login exitoso', token, user: { username: user.username, fullName: user.fullName } });
};

module.exports = { register, login };
