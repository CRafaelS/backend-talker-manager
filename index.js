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

app.get('/talker/search',
  validateToken,
  async (req, res) => {
    const { q } = req.query;
    const dataTalker = await getTalker();
    const talkerIndex = dataTalker.filter((talker) => talker.name.includes(q));

    return res.status(200).json(talkerIndex);
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

app.put('/talker/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatched,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const dataTalker = await getTalker();
    const talkerIndex = dataTalker.filter((data) => data.id !== +id);
    const changeTalker = { name, age, id: +id, talk };
    await writeTalker([...talkerIndex, changeTalker]);

    return res.status(200).json(changeTalker);
});

app.delete('/talker/:id', 
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const dataTalker = await getTalker();
    const talkerIndex = dataTalker.filter((data) => data.id !== +id);
    await writeTalker(talkerIndex);

    return res.status(204).json();
});

app.post('/login', validateEmail, validatePassword, 
  (_req, res) => res.status(200).send({ token: generateToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
