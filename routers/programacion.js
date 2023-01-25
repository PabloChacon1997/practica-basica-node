const express = require("express");
const routerProgramacion = express.Router();

// Middleware
routerProgramacion.use(express.json());

const { programacion } = require("../datos/cursos.js").infoCursos;

routerProgramacion.get("/", (req, res) => {
  res.json(programacion);
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);
  if (resultado.length === 0) {
    return res
      .status(404)
      .send(`No se encotro cursos del lenguaje: ${lenguaje}`);
  }

  if (req.query.ordenar === "vistas") {
    return res.json(resultado.sort((a, b) => a.vistas - b.vistas));
  }

  res.json(resultado);
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultado = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultado.length === 0) {
    return res
      .status(404)
      .send(
        `No se encotro cursos del lenguaje: ${lenguaje} con el nivel: ${nivel}`
      );
  }

  res.json(resultado);
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(programacion);
});

routerProgramacion.put("/:id", (req, res) => {
  const id = req.params.id;
  const cursoActualizado = req.body;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
    return res.json(programacion);
  }
  res.send("No se encontro el curso.");
});

routerProgramacion.patch("/:id", (req, res) => {
  const id = req.params.id;
  const infoActual = req.body;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    const cursoAmodificar = programacion[indice];
    Object.assign(cursoAmodificar, infoActual);
    return res.json(programacion);
  }
  res.send("No se encontro el curso.");
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice > 0) {
    programacion.splice(indice, 1);
    return res.json(programacion);
  }
  res.send("No se pudo eliminar el curso.");
});

module.exports = routerProgramacion;
