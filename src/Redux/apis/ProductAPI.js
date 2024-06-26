export const fetchProductById = async (id) => {
  const response = await fetch("/api/products/productById/" + id);
  const data = await response.json();
  return data;
};

export const createProduct = async (product) => {
  const response = await fetch("/api/products/create", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const updateProduct = async ({id,product}) => {
  const response = await fetch("/api/products/update/"+id, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchProductsByFilter = async (filter, sort, pagination) => {
  // filter = {"category" : {"smartphone","laptop"}}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}

  // TODO : on server we will support multi values
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  const response = await fetch("/api/products/getAllProducts?" + queryString);
  const data = await response.json();
  const totalItems = await response.headers.get("X-Total-Count");
  return { products: data, totalItems: +totalItems };
};

export const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  const {categories} = await response.json();
  return categories;
};
export const fetchBrands = async () => {
  const response = await fetch("/api/brands");
  const {brands} = await response.json();
  return brands;
};

export const fetchSuggestions = async (category) => {
  const response = await fetch(`/api/products/suggestion/${category}`,)
  if(response.ok){
    const data = await response.json()
    return data;
  }
}