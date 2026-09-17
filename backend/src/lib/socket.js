import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import { queryObjects } from "v8";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
});

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

//this is for storing online users
const userSocketMap = {}; //{userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //io.emit() is used to send eevents to all connectd clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //with socket.on() we listen for events from client
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
