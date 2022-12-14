const fs = require("fs").promises;
const { join } = require("path");

const path = "./talker.json";
const filePath = join(__dirname, path);

const readTalkerFile = async () => {
  try {
    const contentFile = await fs.readFile(filePath, "utf-8");
    return JSON.parse(contentFile);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const writeTalkerFile = async (content) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  return talkers.filter((talker) => talker.id === id);
};

const editTalker = async (req, res, next) => {
  const id = Number(req.params.id);
  const talkers = await readTalkerFile();
  const talker = talkers.find((t) => t.id === id);
  const index = talkers.indexOf(talker);
  const updated = { id, ...req.body };
  talkers.splice(index, 1, updated);
  await writeTalkerFile(talkers);
  next();
};

const deleteTalker = async (req, res, next) => {
  const id = Number(req.params.id);
  const talkers = await readTalkerFile();
  const talker = talkers.find((t) => t.id === id);

  if (talker) {
    const index = talkers.indexOf(talker);
    talkers.splice(index, 1);
    await writeTalkerFile(talkers);
  }
  next();
};

const validateToken = (req, res, next) => {
  const { headers, body } = req;
  if (headers.authorization === undefined) {
    return res.status(401).json({ message: "Token não encontrado" });
  }
  if (headers.authorization.length !== 16) {
    return res.status(401).json({ message: "Token inválido" });
  }
  next();
};

const validateName = (req, res, next) => {
  const { body } = req;
  const { name } = body;
  if (name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { body } = req;
  const { age } = body;
  const ageInInteger = Number(age);
  if (age === undefined || Number.isNaN(ageInInteger)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (ageInInteger < 18) {
    return res
      .status(400)
      .json({ message: "A pessoa palestrante deve ser maior de idade" });
  }
  next();
};
const validateTalk = (req, res, next) => {
  const { body } = req;
  const { talk } = body;
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { body } = req;
  const { talk } = body;
  const dateRegex =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (talk.watchedAt === undefined) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateRegex.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { body } = req;
  const { talk } = body;

  const rateInInteger = Number(talk.rate);

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rateInInteger < 1 || rateInInteger > 5 || !Number.isInteger(talk.rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  writeTalkerFile,
  readTalkerFile,
  getAllTalkers,
  getTalkerById,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  editTalker,
  deleteTalker,
};
