import marcasRepository from "../repositories/marcas.repository.js";
import { promises as fs } from "fs";

const { readFile } = fs;

async function getMarcaByParams(data, ordem, limit) {
  let list = [];
  let qtdUltimo = 0;

  data.sort(function (a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  });

  if (ordem === "ASC") {
    data.sort(function (a, b) {
      return a.models.length - b.models.length;
    });
    if (limit) {
      for (let i = 0; i < limit; i++) {
        list.push(`${data[i].brand} - ${data[i].models.length}`);
      }
    } else {
      qtdUltimo = data[0]?.models?.length;
      for (let i = 0; data[i]?.models?.length <= qtdUltimo; i++) {
        list.push(`${data[i].brand}`);
      }
    }
  }

  if (ordem === "DESC") {
    data.sort(function (a, b) {
      return b.models.length - a.models.length;
    });
    if (limit) {
      for (let i = 0; i < limit; i++) {
        list.push(`${data[i].brand} - ${data[i].models.length}`);
      }
    } else {
      qtdUltimo = data[0]?.models?.length;
      for (let i = 0; data[i]?.models?.length >= qtdUltimo; i++) {
        list.push(`${data[i].brand}`);
      }
    }
  }

  return list;
}

async function listaModelos(body, data) {
  try {
    if (body?.nomeMarca?.length < 1) {
      res.status(405).send("Parâmetros de busca inválidos");
    }
    const marca = JSON.parse(data).find((brand) => {
      if (brand["brand"].toLowerCase() === body.nomeMarca.toLowerCase()) {
        return brand["models"];
      }
    });
    if (marca) {
      return marca;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export default {
  getMarcaByParams,
  listaModelos,
};
