require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

// CORS 설정 (macOS AirPlay 충돌 방지 위해 포트 5005 사용)
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB 연결 (로컬 또는 환경변수 URI)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-mongodb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('몽고DB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 에러:', err));

// 기본 라우트 (헬스 체크)
app.get('/', (req, res) => {
  res.json({ message: 'Todo API 서버가 정상 작동 중입니다.' });
});

// Todo 라우터 등록
app.use('/todos', todoRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 시작되었습니다.`);
});
