const getCategory = async (endPoint) => {
  const response = await fetch(endPoint);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default getCategory;
