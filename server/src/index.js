const io = require("socket.io")(process.env.PORT || 8000, {
  cors: {
    origin: "http://127.0.0.1:3000/Game-Map",
  },
});

const socketLocations = {};

io.on("connection", (socket) => {
  const id = socket.id;
  socketLocations[id] = {};

  console.log(`${id} connected`);

  socket.on("coord-update", (coords) => {
    socketLocations[id] = coords;

    io.emit("list-update", socketLocations);
    console.log(socketLocations);
  });
  socket.on("disconnect", (reason) => {
    delete socketLocations[id];
    io.emit("list-update", socketLocations);
  });
});
