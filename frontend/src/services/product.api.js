const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllProducts = async (query) => {
  const params = new URLSearchParams(query).toString();
  const response = await fetch(`${BASE_URL}/product?${params}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
};

export const getAllCategories = async () => {
  const response = await fetch(`${BASE_URL}/category`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const updateProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/product`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
