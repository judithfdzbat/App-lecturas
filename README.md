# 📚 Lecturas — Tu estantería digital

App para **gestionar tus lecturas**: añade libros, edítalos, marca progreso y consulta estadísticas. Hecha con **React + Vite + Tailwind** con foco en accesibilidad.

## ✨ Características

- ♿ Accesible: `lang="es"`, foco visible, labels asociadas, roles/aria en listas y tarjetas.
- 📝 CRUD completo: añadir, editar, eliminar, marcar como leído.
- 💾 Persistencia local con `localStorage` (hook `useLocalStorage` con fallback seguro).
- 📊 Estadísticas: total, leídos, pendientes y progreso medio.
- 📱 Responsive y con estilos componibles (Tailwind + utilidades propias).
- 🧹 Código organizado: Context API para estado global y componentes pequeños.


## 🛠️ Stack

- React + Vite
- Tailwind CSS
- Context API
- localStorage

## ▶️ Desarrollo

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📂 Estructura

```
src/
  components/
    BookCard.jsx
    BookForm.jsx
    Header.jsx
    Stats.jsx
  context/
    BooksContext.jsx
  hooks_useLocalStorage.js
  index.css
  main.jsx
  App.jsx

