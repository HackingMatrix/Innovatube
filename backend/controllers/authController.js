const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { findUserByEmailOrUsername, createUser } = require('../models/userModel');

// ✅ Validar reCAPTCHA con Google
const validateCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`
  });
  const data = await response.json();
  console.log('✅ Resultado de validación reCAPTCHA:', data);
  return data.success;
};

// ✅ Registro
const register = async (req, res) => {
    
  console.log('Cuerpo recibido:', req.body);
  const { fullName, username, email, password, recaptchaToken } = req.body;
  console.log('🔐 Token recibido para reCAPTCHA:', recaptchaToken);
  // Validar ReCAPTCHA
  const isHuman = await validateCaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({ message: 'ReCAPTCHA inválido' });
  }

  const existing = findUserByEmailOrUsername(email) || findUserByEmailOrUsername(username);
  if (existing) return res.status(400).json({ message: 'Usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({ fullName, username, email, password: hashedPassword });
  console.log('⚠️ Usuario ya existe:', existing);
  res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

// ✅ Login
const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = findUserByEmailOrUsername(identifier);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ message: 'Login exitoso', token, user: { username: user.username, fullName: user.fullName } });
};

// ✅ Forgot password (simulado)
const forgotPassword = (req, res) => {
  const { email } = req.body;

  const resetToken = crypto.randomBytes(20).toString('hex');

  // Aquí puedes guardar el token en memoria o base de datos si tuvieras
  console.log(`Simulando envío de correo a ${email} con token: ${resetToken}`);

  res.json({ message: 'Enlace de recuperación enviado (simulado).' });
};

module.exports = {
  register,
  login,
  forgotPassword
};
