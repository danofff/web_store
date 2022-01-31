import baseUrl from "./baseUrl";
import makeHeaders from "./makeHeaders";

//CATEGORIES API
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

export const addCategory = async (token, title) => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    headers: makeHeaders(token),
    body: JSON.stringify({
      title,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

export const editCategory = async (token, categoryId, title) => {
  const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
    method: "PATCH",
    headers: makeHeaders(token),
    body: JSON.stringify({
      title,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

export const deleteCategory = async (token, categoryId) => {
  const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
    method: "DELETE",
    headers: makeHeaders(token),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//PRODUCTS API
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

export const addProduct = async (token, productData) => {
  const response = await fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: makeHeaders(token),
    body: JSON.stringify({
      ...productData,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//ORDERS API
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
