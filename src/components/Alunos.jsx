import { useEffect, useMemo, useState } from "react";
import { listarAlunos } from "../services/alunoService";

function Alunos({ onEditar, onExcluir }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenarDesc, setOrdenarDesc] = useState(true);

  useEffect(() => {
    setLoading(true);
    listarAlunos()
      .then(setAlunos)
      .finally(() => setLoading(false));
  }, []);

  const alunosOrdenados = useMemo(() => {
    return [...alunos].sort((a, b) =>
      ordenarDesc ? b.media - a.media : a.media - b.media
    );
  }, [alunos, ordenarDesc]);

  if (loading) {
    return <p>Carregando alunos…</p>;
  }

  if (alunos.length === 0) {
    return <p>Nenhum aluno cadastrado.</p>;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Alunos</h2>
        <button onClick={() => setOrdenarDesc(!ordenarDesc)}>
          Ordenar por média {ordenarDesc ? "↓" : "↑"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Média</th>
            <th>Frequência</th>
             <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {alunosOrdenados.map((a) => {


            return (
              <tr key={a.id}>
                <td>{a.nome}</td>

                <td className={a.media >= 7 ? "good" : "bad"}>
                  {a.media.toFixed(1)}
                </td>

                <td className={a.frequencia >= 75 ? "good" : "bad"}>
                  {a.frequencia}%
                </td>

                

                
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => onEditar(a)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => onExcluir(a.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Alunos;
