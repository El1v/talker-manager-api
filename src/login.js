const tokenLength = 16;

const generateToken = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLength; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
};

const validateEmailFormat = (email) => {
  const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return email.match(validEmail);
};

const validateEmail = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmailFormat(body.email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { body } = req;
  if (!body.password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (body.password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
};
