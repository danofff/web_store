import baseUrl from "./baseUrl";
import makeHeaders from "./makeHeaders";

export const addOrder = async (cart, token) => {
  const response = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: token ? makeHeaders(token) : makeHeaders(),
    body: JSON.stringify({
      cart,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
