const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Utility function for authorized requests
export async function apiRequest(path, method = "GET", body = null, token = null) {
  let headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}