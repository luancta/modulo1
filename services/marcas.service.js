import marcasRepository from "../repositories/marcas.repository.js";

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

async function listaModelos(req, res, data) {
  try {
    let body = req.body;
    if (body?.nomeMarca?.length < 1) {
      res.status(405).send("Parâmetros de busca inválidos");
    }
    const marca = marcasRepository.getMarcas.find((brand) => {
      if (brand["brand"].toLowerCase() === body.nomeMarca.toLowerCase()) {
        return brand["models"];
      }
    });
    if (marca) {
      res.status(200).send(JSON.stringify(marca["models"]));
    } else {
      res.status(404).send([]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

export default {
  getMarcaByParams,
  listaModelos,
};
