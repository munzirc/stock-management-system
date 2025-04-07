const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getStockOverview = async () => {
  const response = await fetch(`${BASE_URL}/stocks/overview`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
};
