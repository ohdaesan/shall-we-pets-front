const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 클라이언트 애플리케이션의 정적 파일을 제공
app.use(express.static(path.join(__dirname, 'src/build')));

// 기본 라우트 핸들러 추가
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/build', 'index.html'));
});

// 클라이언트가 연결되면
io.on('connection', (socket) => {
    console.log('New client connected');

    // 클라이언트로부터 메시지를 수신하면 모든 클라이언트에 브로드캐스트
    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    // 클라이언트가 연결을 끊으면 로그
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// 서버 포트 설정
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
