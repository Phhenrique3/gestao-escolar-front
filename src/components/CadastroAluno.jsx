import { useEffect, useState } from "react";
import { cadastrarAluno, atualizarAluno } from "../services/alunoService";

function CadastroAluno({ onCadastro, alunoEditando }) {
  const [form, setForm] = useState({
    nome: "",
    mediaDisciplina1: "",
    mediaDisciplina2: "",
    mediaDisciplina3: "",
    mediaDisciplina4: "",
    mediaDisciplina5: "",
    frequencia: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (alunoEditando) {
      setForm({
        nome: alunoEditando.nome,
        mediaDisciplina1: alunoEditando.mediaDisciplina1 ?? "",
        mediaDisciplina2: alunoEditando.mediaDisciplina2 ?? "" ,
        mediaDisciplina3: alunoEditando.mediaDisciplina3 ?? "",
        mediaDisciplina4: alunoEditando.mediaDisciplina4 ?? "",
        mediaDisciplina5: alunoEditando.mediaDisciplina5 ?? "",
        frequencia: alunoEditando.frequencia,
      });
    }
  }, [alunoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      const apenasLetras = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
      setForm({ ...form, [name]: apenasLetras });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const limparForm = () => {
    setForm({
      nome: "",
      mediaDisciplina1: "",
      mediaDisciplina2: "",
      mediaDisciplina3: "",
      mediaDisciplina4: "",
      mediaDisciplina5: "",
      frequencia: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    const payload = {
      nome: form.nome,
      mediaDisciplina1: Number(form.mediaDisciplina1),
      mediaDisciplina2: Number(form.mediaDisciplina2),
      mediaDisciplina3: Number(form.mediaDisciplina3),
      mediaDisciplina4: Number(form.mediaDisciplina4),
      mediaDisciplina5: Number(form.mediaDisciplina5),
      frequencia: Number(form.frequencia),
    };

    try {
      if (alunoEditando) {
        await atualizarAluno(alunoEditando.id, payload);
        setMensagem({ tipo: "sucesso", texto: "Aluno atualizado com sucesso!" });
      } else {
        await cadastrarAluno(payload);
        setMensagem({ tipo: "sucesso", texto: "Aluno cadastrado com sucesso!" });
      }

      limparForm();
      onCadastro();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: "Erro ao salvar aluno." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>{alunoEditando ? "Editar Aluno" : "Cadastrar Aluno"}</h2>

      {mensagem && (
        <p className={mensagem.tipo === "sucesso" ? "msg-ok" : "msg-erro"}>
          {mensagem.texto}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full">
          <label>Nome do aluno</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        {[1, 2, 3, 4, 5].map((n) => (
          <div className="form-group" key={n}>
            <label>Nota {n}</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name={`mediaDisciplina${n}`}
              value={form[`mediaDisciplina${n}`]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="form-group full">
          <label>Frequência (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            name="frequencia"
            value={form.frequencia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Salvando..."
              : alunoEditando
              ? "Atualizar"
              : "Salvar"}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={limparForm}
            disabled={loading}
          >
            Limpar
          </button>
        </div>
      </form>
    </section>
  );
}

export default CadastroAluno;
