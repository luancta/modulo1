import express from "express";
import MarcasController from "../controllers/marcas.controller.js";

const router = express.Router();

export default router;

router.get("/listaMaisModelos/:x", MarcasController.listaMaisModelos);

router.get("/maisModelos", MarcasController.maisModelos);

router.get("/listaMenosModelos/:x", MarcasController.listaMenosModelos);

router.get("/menosModelos", MarcasController.menosModelos);

router.post("/listaModelos", MarcasController.listaModelos);
