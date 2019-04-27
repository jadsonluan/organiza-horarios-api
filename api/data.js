import fs from 'fs';

const CSV_NAME = 'horario20191.csv';

const readFile = function(path) {
    var fileContent;
    return new Promise(function(resolve) {
        fileContent = fs.readFileSync(path, {encoding: 'utf8'});
        resolve(fileContent);
    });
}

const dias = {
  s: 'segunda',
  t: 'terca',
  q: 'quarta',
  i: 'quinta',
  x: 'sexta'
}

const convertToObject = (text) => {
  var [ sala, disciplina_turma, professor, categoria, periodo_composto, horario ] = text.split(",");
  var turma = disciplina_turma.split('-').pop();
  var disciplina = disciplina_turma.slice(0, -3);
  var [ periodo_ppc_antigo, periodo_ppc_novo ] = periodo_composto.split(';');
  var dia = horario[0];
  var hora = horario.substring(1);
  
  return {
    sala,
    disciplina,
    turma,
    professor,
    categoria,
    periodo_ppc_antigo,
    periodo_ppc_novo,
    horario: {
      dia: dias[dia],
      hora
    }
  }
}

export default async function loadSchedule() {
  var horarios;

  await readFile(`csv/${CSV_NAME}`).then(content => {
    var contentAsStringArray = content.split('\r\n');
    contentAsStringArray.shift(); // Remove header (first element)
    horarios = contentAsStringArray.map(convertToObject);
  })

  return horarios;
}
