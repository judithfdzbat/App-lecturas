import { useBooks } from "../context/BooksContext";

export default function BookCard({ book }) {
  const { deleteBook, toggleRead, startEdit } = useBooks();
  const { id, title, author, progress = 0, read = false } = book;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 grid gap-3" aria-label={title}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-slate-600">de {author}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full border" aria-label={read ? "Leído" : "Pendiente"}>
          {read ? "Leído ✅" : "Pendiente"}
        </span>
      </header>

      <div className="grid gap-1">
        <label className="text-sm text-slate-600">Progreso</label>
        <div className="h-2 bg-slate-200 rounded">
          <div className="h-full rounded bg-slate-900" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
        </div>
        <span className="text-xs text-slate-600">{Math.min(100, Math.max(0, progress))}%</span>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="btn-ghost" onClick={() => startEdit(id)} aria-label={`Editar ${title}`}>Editar</button>
        <button className="btn-danger" onClick={() => deleteBook(id)} aria-label={`Eliminar ${title}`}>Eliminar</button>
        <button className="btn-secondary ml-auto" onClick={() => toggleRead(id)} aria-label={`Marcar ${title} como ${read ? "no leído" : "leído"}`}>
          {read ? "Marcar pendiente" : "Marcar leído"}
        </button>
      </div>
    </article>
  );
}
