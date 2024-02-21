import express from "express";
import handlebars from "express-handlebars";
import config from "./config/config.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import run from "./util/run.util.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

//initializePassport();
//app.use(passport.initialize());

try {
  await mongoose.connect(config.mongo.url, {
    dbName: `${config.mongo.db_name}`,
  });
  console.log(`DB connected`);

  const httpServer = app.listen(config.PORT, () =>
    console.log(`Server Running in port ${config.PORT}`)
  );
  const socket = new Server(httpServer);

  run(socket, app);
} catch (error) {
  console.log(error);
  process.exit(-1);
}
