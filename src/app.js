import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import config from "./config/config.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import run from "./util/run.util.js";

//importo passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

//configuramos las sessions
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `${config.mongo.url}`,
      dbName: `${config.mongo.db_name}`,
    }),
    secret: `${config.mongo.secret}`,
    resave: true,
    saveUninitialized: true,
  })
);

//configuro passport
initializePassport();
app.use(passport.initialize());

//inicializa las sessions
app.use(passport.session());

//inicializo flash
app.use(flash());

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
