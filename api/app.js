import 'dotenv/config';
import express from 'express';
import loadSchedule from './data.js';

var app = express();

var loading = true;

var horarios = loadSchedule().then(r => {
  horarios = r;
  loading = false;
})

app.get('/', (req, res) => {
  if (loading)
    res.send("Data still loading.\n Wait a few seconds and try again.");
  else
    res.send("First: " + JSON.stringify(horarios[0]));
});

app.get('/horarios', (req, res) => {
  res.status(200).send(horarios);
})

var dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

app.get('/horarios/:dia', (req, res) => {
  var dia = req.params.dia;

  if (dia && dias.includes(dia.toLowerCase())) {
    var horariosFiltrados = horarios.filter((horario) => {
      if (horario.horario[0] === dias[dia]) return horario;
    })
    res.status(200).send(horariosFiltrados);
  } else {
    res.status(400).send([]);
  }
})

app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});