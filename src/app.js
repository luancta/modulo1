import express from "express";
import marcasRouter from "../routes/marcas.js";
import { promises as fs } from "fs";
import fetch from "node-fetch";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerDocument } from "../docs.js";

const app = express();
const port = 3000;

const { writeFile } = fs;

const router = express.Router();
app.use(express.json());
app.use("/marcas", marcasRouter);
app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));
app.listen(port, async () => {
  const url =
    "https://github.com/matthlavacka/car-list/raw/5a00f3a802080982a1173a19d6ec560d1077406f/car-list.json";
  let settings = { method: "Get" };
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      writeFile("cars.json", JSON.stringify(json));
    });
  console.log("App Cars Iniciada");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro no sistema!").send(err.log);
});
