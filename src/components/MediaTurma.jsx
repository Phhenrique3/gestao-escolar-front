import { useEffect, useState } from "react";
import { mediaTurma } from "../services/alunoService";

function MediaTurma() {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    mediaTurma().then(setMedia);
  }, []);

  if (!media) return null;

  return (
    <>
      <h2>Média da Turma por Disciplina</h2>
      <ul>
        <li>Disciplina 1:{media.mediaDisciplina1}</li>
        <li>Disciplina 2: {media.mediaDisciplina2}</li>
        <li>Disciplina 3: {media.mediaDisciplina3}</li>
        <li>Disciplina 4: {media.mediaDisciplina4}</li>
        <li>Disciplina 5: {media.mediaDisciplina5}</li>
      </ul>
    </>
  );
}

export default MediaTurma;
