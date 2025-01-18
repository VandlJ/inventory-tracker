import axios from "axios";

const API_URL = "http://109.164.63.64:8000/api/items";

// Získání všech položek
export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Vytvoření nové položky
export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// Aktualizace položky
export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

// Smazání položky
export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
