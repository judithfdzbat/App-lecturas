const KEY = 'lecturas.v1'

export function loadBooks() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveBooks(books) {
  localStorage.setItem(KEY, JSON.stringify(books))
}

export function uid() {
  return Math.random().toString(36).slice(2,9)
}
