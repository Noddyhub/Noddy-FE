import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("WebSocket 서버 실행 중");
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  console.log("🟢 클라이언트 연결됨:", req.socket.remoteAddress);

  ws.on("message", (message) => {
    console.log("📨 수신:", message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.send("서버에 연결되었습니다!");
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중`);
});
