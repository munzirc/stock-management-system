const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const checkAuth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/check-auth`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Session expired");
    return await res.json();
  } catch (error) {
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message);
    err.severity(data.severity);
    throw err;
  }

  return data;
};

const createUser = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/create-user`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  checkAuth,
  login,
  logout,
  createUser,
};
