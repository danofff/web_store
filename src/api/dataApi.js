import baseUrl from "./baseUrl";
import makeHeaders from "./makeHeaders";

export const getCategories = async (token) => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "GET",
    headers: makeHeaders(token),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
