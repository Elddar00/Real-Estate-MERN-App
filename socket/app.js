import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

// da se premesi u API

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser);
  });

  // socket.on("sendMessage", ({ receiverId, data }) => {
  //   const receiver = getUser(receiverId);
  //   io.to(receiver.socketId).emit("getMessage", data);
  // });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log("Receiver not found or socketId is undefined");
      console.log("ReceiverId:", receiverId);
      console.log("Online users:", onlineUser);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");
