import axios from "axios";

const api = axios.create({
  baseURL: "https://cabinsbooking.onrender.com",
  maxRedirects: 0,
});

export async function login(email, password) {
  const { data: user } = await api.get("/users", {
    params: {
      email,
      password,
    },
  });

  if (user.length > 0) {
    localStorage.setItem("isAuthenticated", true);
    return true;
  } else {
    throw new Error("Invalid credentials");
  }
}
