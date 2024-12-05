const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let apiToken;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Вітаємо! API працює успішно.',
    status: 'OK'
  });
});

app.post('/api/set-token', (req, res, next) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return next(new Error('Необхідно передати API ключ.'));
  }

  apiToken = apiKey;
  res.json({
    message: 'API ключ успішно встановлено.',
  });
});

app.get('/api/monobank-client-info', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.monobank.ua/personal/client-info', {
      headers: {
        'X-Token': apiToken,
      },
    });

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/monobank-statement', async (req, res, next) => {
  const { accountId, from, to } = req.query;

  if (!accountId || !from || !to) {
    return next(new Error('Необхідно вказати accountId, from і to.'));
  }

  try {
    const response = await axios.get(
      `https://api.monobank.ua/personal/statement/${accountId}/${from}/${to}`,
      {
        headers: {
          'X-Token': apiToken,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/monobank-currency', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency', {
      headers: {
        'X-Token': apiToken,
      },
    });

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const message = err.message || 'Щось пішло не так!';
  console.log('ErrMesageLog: ' + message);

  res
    .status(err.status || 500)
    .json({
      message,
      error: message,
    });

  alert(message);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});

module.exports = app;