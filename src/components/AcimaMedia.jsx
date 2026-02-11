import { useEffect, useState } from "react";
import { acimaMedia } from "../services/alunoService";

function AcimaMedia() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    acimaMedia().then(setAlunos);
  }, []);

  return (
    <>
      <h2>Alunos com Média Acima da Turma</h2>
      <ul>
        {alunos.map((nome, i) => (
          <li key={i} className="good">
            {nome}
          </li>
        ))}
      </ul>
    </>
  );
}

export default AcimaMedia;
