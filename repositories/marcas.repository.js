import { promises as fs } from "fs";
const { readFile } = fs;

async function getMarcas() {
  try {
    await readFile("cars.json").then((data) => {
      return JSON.parse(data);
    });
  } catch (err) {
    console.log(err);
  }
}

export default {
  getMarcas,
};
