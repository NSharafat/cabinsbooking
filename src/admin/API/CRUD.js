import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function addCabin(cabin) {
  const { data: res } = await api.post("/cabins", {
    ...cabin,
    status: "available",
  });
  console.log("res", res);
  return true;
}

export async function GetAllCabins() {
  const { data } = await api.get("/cabins");

  return data;
}

export async function getItem(id) {
  const data = await new Promise((r) => setTimeout(r, 500));
  const res = "updated";

  return res;
}
export async function updateCabin(cabin) {
  const data = await new Promise((r) => setTimeout(r, 500));
  const res = "updated";

  return false;
}

export async function deleteCabin(id) {
  const data = await new Promise((r) => setTimeout(r, 500));

  const res = Math.random() - Math.random();

  return res > 0 ? true : false;
}
