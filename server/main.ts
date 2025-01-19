import express from 'express';

const app = express();
const PORT = 3000;

// JSONリクエストボディのパース設定
app.use(express.json());

// シンプルなルート
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
