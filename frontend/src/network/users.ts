import User from "../models/user";

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

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(`${env.VITE_BACKEND_API}/api/users`, {
    credentials: "include",
    method: "GET",
  });
  return response.json();
}

export async function getPublicUser(
  username: string
): Promise<{ exists: boolean }> {
  const response = await fetchData(
    `${env.VITE_BACKEND_API}/api/users/${username}`,
    { method: "GET" }
  );
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
}: UserProps): Promise<User> {
  const response = await fetchData(`${env.VITE_BACKEND_API}/api/users/signUp`, {
    method: "POST",
    credentials: "include",
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
}: UserProps): Promise<User> => {
  console.log(env.VITE_BACKEND_API);

  const response = await fetchData(`${env.VITE_BACKEND_API}/api/users/login`, {
    method: "POST",
    credentials: "include",
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

export const logout = async () => {
  await fetchData(`${env.VITE_BACKEND_API}/api/users/logout`, {
    credentials: "include",
    method: "POST",
  });
};
