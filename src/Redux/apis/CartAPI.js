export const addToCart = async (item) => {
  const response = await fetch("/api/cart/addToCart", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export const fetchItemsByUserId = async (userId) => {
  const response = await fetch("/api/cart/userCart?user=" + userId);
  const data = await response.json();
  return data;
};

export const updateCart = async (update) => {
  const response = await fetch("/cart/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const deleteItemFromCart = async (itemId) => {
  const response = await fetch("/api/cart/deleteItem/" + itemId, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const resetCart = async (userId) => {
  const response = await fetchItemsByUserId(userId);
  const items = response;
  console.log(items)
  for (let item of items) {
    await deleteItemFromCart(item._id);
  }
  return { status: "success" };
};
