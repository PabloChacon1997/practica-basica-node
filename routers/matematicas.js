const express = require("express");
const { matematicas } = require("../datos/cursos.js").infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {
  res.send(matematicas);
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;

  const resultado = matematicas.filter((curso) => curso.tema === tema);
  if (resultado.length === 0) {
    return res.send(`No se encontro cursos de: ${tema}`);
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(resultado));
});

module.exports = routerMatematicas;
