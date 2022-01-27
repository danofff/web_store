const makeHeaders = (token) => {
  const headers = {
    "Content-type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export default makeHeaders;
