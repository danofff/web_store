import baseUrl from "./baseUrl";
import makeHeaders from "./makeHeaders";

export const addOrder = async (
  token,
  cart,
  email,
  phone,
  address,
  fullname
) => {
  const response = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: token ? makeHeaders(token) : makeHeaders(),
    body: JSON.stringify({
      cart,
      email,
      phone,
      address,
      fullname,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
