import baseUrl from "./baseUrl";
import makeHeaders from "./makeHeaders";

export const loginUser = async (email, password) => {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

export const registerUser = async (email, password, address, zip) => {
  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify({
      email,
      password,
      address,
      zip,
    }),
  });
};
