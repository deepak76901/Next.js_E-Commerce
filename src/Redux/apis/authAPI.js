

export const createUser = async (userData) => {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const checkUser = async (logInInfo) => {
  try {
  
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(logInInfo),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const {user} = await response.json()
      return user;
    } else {
      const err = await response.json();
      console.log(err);
    }

  } catch (error) {
    console.log(error.message);
  }
};

export const logOut = async (userId) => {
  return { data: "success" };
};
