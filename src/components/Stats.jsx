import { useMemo } from "react";
import { useBooks } from "../context/BooksContext";

export default function Stats() {
  const { books } = useBooks();

  const { total, read, pending, avg } = useMemo(() => {
    const total = books.length;
    const read = books.filter((b) => b.read || b.progress >= 100).length;
    const pending = total - read;
    const avg = total ? Math.round(books.reduce((acc, b) => acc + (Number(b.progress) || 0), 0) / total) : 0;
    return { total, read, pending, avg };
  }, [books]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat label="Total" value={total} />
      <Stat label="Leídos" value={read} />
      <Stat label="Pendientes" value={pending} />
      <Stat label="Progreso medio" value={avg + "%"} />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
