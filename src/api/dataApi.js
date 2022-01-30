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

export const getProducts = async () => {
  const response = await fetch(`${baseUrl}/products`, {
    method: "GET",
    headers: makeHeaders(),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

export const getAllOrders = async (token) => {
  const response = await fetch(`${baseUrl}/orders`, {
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

export const getOrderById = async (token, orderId) => {
  const response = await fetch(`${baseUrl}/orders/${orderId}`, {
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
