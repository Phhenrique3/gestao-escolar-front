import { useEffect, useState } from "react";
import { frequenciaBaixa } from "../services/alunoService";

function FrequenciaBaixa() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    frequenciaBaixa().then(setAlunos);
  }, []);

  return (
    <>
      <h2>Alunos com Frequência Abaixo de 75%</h2>
      <ul>
        {alunos.map((nome, i) => (
          <li key={i} className="bad">
            {nome}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FrequenciaBaixa;
