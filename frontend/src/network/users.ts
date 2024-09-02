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

export async function getLoggedInUser(): Promise<{
  id: number;
  username: string;
  email: string;
}> {
  const response = await fetchData("localhost:5000/api/users");
  return response.json();
}
