import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
