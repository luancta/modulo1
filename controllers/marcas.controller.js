import { promises as fs } from "fs";
import marcasService from "../services/marcas.service.js";
const { readFile } = fs;

async function listaMaisModelos(req, res) {
  try {
    let limit = req.params.x;
    await readFile("cars.json").then((data) => {
      marcasService
        .getMarcaByParams(JSON.parse(data), "DESC", limit)
        .then((brands) => {
          res.status(200).send(JSON.stringify(brands));
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

async function listaMenosModelos(req, res) {
  try {
    let limit = req.params.x;
    await readFile("cars.json").then((data) => {
      marcasService
        .getMarcaByParams(JSON.parse(data), "ASC", limit)
        .then((brands) => {
          res.status(200).send(JSON.stringify(brands));
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

async function maisModelos(req, res) {
  try {
    await readFile("cars.json").then((data) => {
      marcasService
        .getMarcaByParams(JSON.parse(data), "DESC", null)
        .then((brands) => {
          res.status(200).send(JSON.stringify(brands));
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

async function menosModelos(req, res) {
  try {
    await readFile("cars.json").then((data) => {
      marcasService
        .getMarcaByParams(JSON.parse(data), "ASC", null)
        .then((brands) => {
          res.status(200).send(JSON.stringify(brands));
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

async function listaModelos(req, res) {
  try {
    let body = req.body;
    if (body?.nomeMarca?.length < 1) {
      res.status(405).send("Parâmetros de busca inválidos");
    }
    await readFile("cars.json").then((data) => {
      marcasService
        .listaModelos(body, data)
        .then((brands) => {
          console.log(brands);
          if (brands) {
            res.status(200).send(JSON.stringify(brands["models"]));
          } else {
            res.status(404).send([]);
          }
        })
        .catch((err) => res.status(404).send([]));
    });
    res.status(404).send([]);
  } catch (err) {
    console.log(err);
  }
}

export default {
  listaMaisModelos,
  listaMenosModelos,
  listaModelos,
  maisModelos,
  menosModelos,
};
