const API_BASE = '';

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return res.json();
}

export { API_BASE, request };
