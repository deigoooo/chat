import express from "express";
import handlebars from "express-handlebars";
import config from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.listen(config.PORT, () => console.log(`server running on port ${config.PORT}`));
