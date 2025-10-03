import Header from "./components/Header";
import BookForm from "./components/BookForm";
import Stats from "./components/Stats";
import BookCard from "./components/BookCard";
import { BooksProvider, useBooks } from "./context/BooksContext";

function List() {
  const { books } = useBooks();
  if (!books.length) {
    return (
      <p className="text-center text-slate-600 mt-8" role="status">
        No hay libros todavía. Añade tu primera lectura arriba.
      </p>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Lista de libros">
      {books.map((b) => (
        <li key={b.id}>
          <BookCard book={b} />
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <BooksProvider>
      <div className="min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6 grid gap-6">
          <section aria-labelledby="form-title" className="bg-white rounded-xl shadow p-4 md:p-6">
            <h2 id="form-title" className="text-xl font-semibold mb-4">Añadir o editar libro</h2>
            <BookForm />
          </section>

          <section aria-labelledby="stats-title">
            <h2 id="stats-title" className="sr-only">Estadísticas</h2>
            <Stats />
          </section>

          <section aria-labelledby="list-title">
            <h2 id="list-title" className="sr-only">Biblioteca</h2>
            <List />
          </section>
        </main>
      </div>
    </BooksProvider>
  );
}
