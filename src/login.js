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

module.exports = {
  generateToken,
};
