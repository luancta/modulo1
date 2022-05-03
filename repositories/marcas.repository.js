import { promises as fs } from "fs";
const { readFile } = fs;

async function getMarcas(req, res) {
  try {
    await readFile("cars.json").then((data) => {
      return JSON.parse(data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

export default {
  getMarcas,
};
