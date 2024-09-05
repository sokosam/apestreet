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

export const getUserStocks = async () => {
  const response = await fetchData("http://localhost:5000/api/userStocks", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
