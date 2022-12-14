const express = require("express");

const router = express.Router();

const talker = require("../talker");

router.get("/", async (req, res) => {
  try {
    const talkers = await talker.getAllTalkers();
    if (talkers === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const talkerById = await talker.getTalkerById(Number(id));
    if (talkerById.length <= 0) {
      return res
        .status(404)
        .json({ message: "Pessoa palestrante não encontrada" });
    }
    return res.status(200).json(talkerById[0]);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

module.exports = router;
