// ...existing code...
// Use NEXT_PUBLIC_API_URL in production/dev or fallback to local backend port 5001
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }
    const err = new Error(body?.message || res.statusText || 'Request failed');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return res.json();
}

// ===== Authors =====
export async function fetchAuthors() {
  const res = await fetch(`${BASE_URL}/author/get-allAuthor`);
  return handleResponse(res);
}

export async function fetchAuthorById(id) {
  const res = await fetch(`${BASE_URL}/author/get-author/${id}`);
  return handleResponse(res);
}

export async function addAuthor(name) {
  const res = await fetch(`${BASE_URL}/author/add-author`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return handleResponse(res);
}

export async function deleteAuthor(id) {
  const res = await fetch(`${BASE_URL}/author/delete-author/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// ===== Books =====
export async function fetchBooks() {
  const res = await fetch(`${BASE_URL}/book/get-all-books`);
  return handleResponse(res);
}

export async function fetchBookById(id) {
  const res = await fetch(`${BASE_URL}/book/get-book/${id}`);
  return handleResponse(res);
}

export async function addBook(title, publishedDate, authorId) {
  const res = await fetch(`${BASE_URL}/book/add-book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, publishedDate, authorId }),
  });
  return handleResponse(res);
}

export async function updateBook(id, title) {
  const res = await fetch(`${BASE_URL}/book/update-book/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return handleResponse(res);
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/book/delete-book/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
// ...existing code...