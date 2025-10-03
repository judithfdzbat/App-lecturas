import { createContext, useContext, useMemo, useState, useEffect } from "react";
import useLocalStorage from "../hooks_useLocalStorage";

const BooksContext = createContext(null);

function safeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function BooksProvider({ children }) {
  const [books, setBooks, clearBooks] = useLocalStorage("books:v1", []);
  const [editingId, setEditingId] = useState(null);

  const addBook = (book) => {
    const withId = { id: safeId(), read: false, progress: 0, ...book };
    setBooks((prev) => [withId, ...prev]);
  };

  const updateBook = (id, patch) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const toggleRead = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, read: !b.read, progress: b.read ? b.progress : 100 } : b))
    );
  };

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  const currentEditing = useMemo(() => books.find((b) => b.id === editingId) || null, [books, editingId]);

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    toggleRead,
    clearBooks,
    // editing
    editingId,
    startEdit,
    cancelEdit,
    currentEditing,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks debe usarse dentro de <BooksProvider>");
  return ctx;
}
