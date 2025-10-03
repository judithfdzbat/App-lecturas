import { useEffect, useId, useState } from "react";
import { useBooks } from "../context/BooksContext";

const empty = { title: "", author: "", progress: 0 };

export default function BookForm() {
  const { addBook, updateBook, currentEditing, cancelEdit } = useBooks();
  const [data, setData] = useState(empty);
  const idTitle = useId();
  const idAuthor = useId();
  const idProgress = useId();

  useEffect(() => {
    if (currentEditing) {
      setData({ title: currentEditing.title || "", author: currentEditing.author || "", progress: currentEditing.progress ?? 0 });
    } else {
      setData(empty);
    }
  }, [currentEditing]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: data.title.trim(),
      author: data.author.trim(),
      progress: Number(data.progress) || 0,
      read: Number(data.progress) >= 100
    };
    if (!payload.title || !payload.author) return;
    if (currentEditing) {
      updateBook(currentEditing.id, payload);
      cancelEdit();
    } else {
      addBook(payload);
    }
    setData(empty);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-3 md:items-end" aria-describedby="form-help">
      <div className="grid gap-2">
        <label htmlFor={idTitle} className="font-medium">Título</label>
        <input
          id={idTitle}
          type="text"
          required
          minLength={2}
          value={data.title}
          onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          className="input"
          placeholder="El nombre del viento"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor={idAuthor} className="font-medium">Autor/a</label>
        <input
          id={idAuthor}
          type="text"
          required
          minLength={2}
          value={data.author}
          onChange={(e) => setData((d) => ({ ...d, author: e.target.value }))}
          className="input"
          placeholder="Patrick Rothfuss"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor={idProgress} className="font-medium">Progreso (%)</label>
        <input
          id={idProgress}
          type="number"
          min={0}
          max={100}
          value={data.progress}
          onChange={(e) => setData((d) => ({ ...d, progress: e.target.value }))}
          className="input"
          aria-describedby="progress-help"
        />
        <p id="progress-help" className="text-xs text-slate-500">0 a 100. 100% lo marca como leído.</p>
      </div>
      <div className="flex gap-3 md:col-span-3">
        <button className="btn-primary" type="submit">{currentEditing ? "Guardar cambios" : "Añadir libro"}</button>
        {currentEditing && (
          <button type="button" className="btn-ghost" onClick={cancelEdit}>Cancelar</button>
        )}
      </div>
      <p id="form-help" className="sr-only">Rellena título, autor y progreso. Usa el botón para añadir o guardar.</p>
    </form>
  );
}
