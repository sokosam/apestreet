const env = import.meta.env;

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    throw Error(
      "Request failed with status: " +
        response.status +
        " message: " +
        errorMessage
    );
  }
};

export const getStockName = async (ticker: string) => {
  const stock_name = await fetchData(`${env.VITE_STOCK_BACKEND_API}/stock`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticker: ticker,
    }),
  });

  return stock_name.json();
};
