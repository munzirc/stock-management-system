const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const downloadProductReport = async () => {
     const res = await fetch(`${BASE_URL}/reports/product`,{
        method: 'GET',
        credentials: 'include'
     });

     return res;
}

export const downloadSalesReport = async () => {
     const res = await fetch(`${BASE_URL}/reports/sale`,{
        method: 'GET',
        credentials: 'include'
     });

     return res;
}