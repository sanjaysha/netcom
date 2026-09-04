import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/route.auth.js";
import messageRoutes from "./routes/route.messages.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*any}", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// }

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
