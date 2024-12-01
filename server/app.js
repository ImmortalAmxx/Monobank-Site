const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiToken = process.env.MONO_API_TOKEN;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Вітаємо! API працює успішно.',
    status: 'OK'
  });
});

app.get('/api/monobank-client-info', async (req, res) => {
  try {
    const response = await axios.get('https://api.monobank.ua/personal/client-info', {
      headers: {
        'X-Token': apiToken,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching client info from Monobank:', error);
    res.status(500).json({
      message: 'Не вдалося отримати інформацію з Monobank.',
      error: error.message
    });
  }
});

app.get('/api/monobank-statement', async (req, res) => {
  const { accountId, from, to } = req.query;

  if (!accountId || !from || !to) {
    return res.status(400).json({
      message: 'Необхідно вказати accountId, from і to.',
    });
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
    console.error('Error fetching statement from Monobank:', error);
    res.status(500).json({
      message: 'Не вдалося отримати виписку з Monobank.',
      error: error.message,
    });
  }
});

app.get('/api/monobank-currency', async (req, res) => {
  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency', {
      headers: {
        'X-Token': apiToken,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching currency info from Monobank:', error);
    res.status(500).json({
      message: 'Не вдалося отримати інформацію з Monobank.',
      error: error.message
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Щось пішло не так!',
    error: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});

module.exports = app;
