const randomRecipe = async (type) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default randomRecipe;
