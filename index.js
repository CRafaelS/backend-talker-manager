const express = require('express');
const { getTalker, generateToken, writeTalker } = require('./helper/helpers');
const { 
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalkRate,
  validateTalkWatched,
  validateTalk,
} = require('./middleware/index');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dataTalker = await getTalker();
  res.status(HTTP_OK_STATUS).json(dataTalker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const dataTalker = await getTalker();
  const talker = dataTalker.find((data) => data.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatched,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const dataTalker = await getTalker();
    console.log(name, age, talk);
    const changeTalker = { 
      name, 
      age,
      id: Math.max(...dataTalker.map((t) => t.id)) + 1,
      talk,
    };
    await writeTalker([...dataTalker, changeTalker]);
    return res.status(201).json(changeTalker);
});

app.post('/login', validateEmail, validatePassword, 
  (_req, res) => res.status(200).send({ token: generateToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
