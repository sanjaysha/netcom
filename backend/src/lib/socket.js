import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
});

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// Store every active connection so multiple tabs do not overwrite each other.
const userSocketMap = new Map();

// we will use this function to check if user is online or not
export function getReceiverSocketId(userId) {
  const normalizedUserId = userId.toString();
  return userSocketMap.has(normalizedUserId) ? normalizedUserId : null;
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  socket.join(userId);

  const sockets = userSocketMap.get(userId) ?? new Set();
  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  //io.emit() is used to send eevents to all connectd clients
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  //with socket.on() we listen for events from client
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.user.fullName);
    const sockets = userSocketMap.get(userId);
    sockets?.delete(socket.id);
    if (sockets?.size === 0) userSocketMap.delete(userId);
    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { app, server, io };
