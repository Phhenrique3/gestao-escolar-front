const API_URL = "http://localhost:8080/alunos";

export const listarAlunos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
export const deletarAluno = async (id) => {
  await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "DELETE",
  });
};

export const atualizarAluno = async (id, aluno) => {
  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  return response.json();
};

export const mediaTurma = async () => {
  const response = await fetch(`${API_URL}/media-turma`);
  return response.json();
};

export const acimaMedia = async () => {
  const response = await fetch(`${API_URL}/acima-media`);
  return response.json();
};

export const frequenciaBaixa = async () => {
  const response = await fetch(`${API_URL}/frequenciaBaixa`);
  return response.json();
};
export const cadastrarAluno = async (aluno) => {
  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  return response.json();
};

