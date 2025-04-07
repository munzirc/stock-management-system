const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAnalyticsData = async () => {
  const res = await fetch(`${BASE_URL}/analytics/overview`, {
    method: "GET",
    credentials: "include",
  });

  return res;
};
