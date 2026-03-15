const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk log SEMUA request (method, path, body, query, headers)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  
  // console.log('┌───────────────────────────────────────────────────────');
  // console.log(`│ Request diterima ${timestamp}`);
  // console.log('├───────────────────────────────────────────────────────');
  // console.log(`│ Method   : ${req.method}`);
  // console.log(`│ Path     : ${req.path}`);
  // console.log(`│ Query    :`, req.query);
  // console.log(`│ Body     :`, req.body || '(kosong)');
  // console.log(`│ Headers  :`, req.headers);
  // console.log('└───────────────────────────────────────────────────────\n');

  // Lanjut ke handler berikutnya
  next();
});

// Middleware biar bisa baca JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catch-all route → semua method + semua path
app.all('*', (req, res) => {
  // Bisa custom response body kalau mau
  console.log('┌───────────────────────────────────────────────────────');
  console.log(`│ 
  console.log('├───────────────────────────────────────────────────────');
  console.log(`│ Method   : ${req.method}`);
  console.log(`│ Path     : ${req.path}`);
  console.log(`│ Query    :`, req.query);
  console.log(`│ Body     :`, req.body || '(kosong)');
  // console.log(`│ Headers  :`, req.headers);
  console.log('└───────────────────────────────────────────────────────\n');
  res.status(200).json({
    status: 'success',
    message: 'Request diterima dan dicatat di console',
    your_request: {
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      timestamp: new Date().toISOString()
    }
  });
});

// 404 tidak perlu, karena semua path sudah ditangkap oleh app.all('*')

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
  console.log('Siap mencatat SEMUA request yang datang...');
});
