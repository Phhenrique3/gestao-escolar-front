import { useState } from "react";
import Alunos from "../components/Alunos";
import CadastroAluno from "../components/CadastroAluno";
import MediaTurma from "../components/MediaTurma";
import AcimaMedia from "../components/AcimaMedia";
import FrequenciaBaixa from "../components/FrequenciaBaixa";
import { deletarAluno } from "../services/alunoService";

function Relatorio() {
  const [refresh, setRefresh] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState(null);

  const atualizar = () => setRefresh(!refresh);

  const onExcluir = async (id) => {
    const confirmar = window.confirm("Deseja excluir este aluno?");
    if (!confirmar) return;

    await deletarAluno(id);
    atualizar();
  };

  return (
    <div className="container">
      <h1>Relatório da Turma</h1>

      
      <CadastroAluno
        alunoEditando={alunoEditando}
        onCadastro={() => {
          setAlunoEditando(null);
          atualizar();
        }}
      />

      <Alunos key={refresh} onEditar={setAlunoEditando} onExcluir={onExcluir} />

      <MediaTurma key={refresh + "media"} />
      <AcimaMedia key={refresh + "acima"} />
      <FrequenciaBaixa key={refresh + "freq"} />
    </div>
  );
}

export default Relatorio;
