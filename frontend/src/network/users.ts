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

interface UserProps {
  username: string;
  email: string;
  password: string;
}

export async function signUpUser({
  username,
  email,
  password,
}: UserProps): Promise<{
  username?: string;
  user_id?: string;
}> {
  const response = await fetchData("http://localhost:5000/api/users/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
  return response.json();
}

export const loginUser = async ({
  username,
  email,
  password,
}: UserProps): Promise<{
  username?: string;
  user_id?: string;
}> => {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
  return response.json();
};
