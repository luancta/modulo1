import express from "express";
import { promises as fs } from "fs";
import MarcasController from "../controllers/marcas.controller.js";
const { readFile } = fs;

const router = express.Router();

export default router;

router.get("/listaMaisModelos/:x", MarcasController.listaMaisModelos);

router.get("/maisModelos", async (req, res) => {
  try {
    await readFile("cars.json").then((data) => {
      getMarcaByParams(JSON.parse(data), "DESC", null).then((brands) => {
        res.status(200).send(JSON.stringify(brands));
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

router.get("/listaMenosModelos/:x", async (req, res) => {
  try {
    let limit = req.params.x;
    await readFile("cars.json").then((data) => {
      getMarcaByParams(JSON.parse(data), "ASC", limit).then((brands) => {
        res.status(200).send(JSON.stringify(brands));
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

router.get("/menosModelos", async (req, res) => {
  try {
    await readFile("cars.json").then((data) => {
      getMarcaByParams(JSON.parse(data), "ASC", null).then((brands) => {
        res.status(200).send(JSON.stringify(brands));
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

function getMax(obj, identificador, atributo) {
  console.log(atributo);
  var max;
  for (var i = 0; i < obj.length; i++) {
    //console.log(obj[i][identificador]);
    //console.log(obj[i][atributo]);
    //console.log(JSON.stringify(obj[i][atributo]).split(",").length);
    console.log(obj[i][identificador]);
    console.log(JSON.stringify(obj[i][atributo]).split(",").length);
    if (
      max == null ||
      JSON.stringify(obj[i][atributo]).split(",").length >
        JSON.stringify(max[atributo]).split(",").length
    ) {
      max = obj[i];
      //console.log(JSON.stringify(max[atributo]).split(",").length);
    }
  }
  console.log(max[identificador]);
  console.log(JSON.stringify(max[atributo]).split(",").length);
  return max;
}

router.post("/listaModelos");

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
