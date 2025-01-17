import axios from "axios";

interface Item {
    id?: string;
    name: string;
    category: string;
    price: number;
    status?: string;
    notes?: string;
}

export async function getItems() {
    try {
        const response = await axios.get(`http://localhost:8000/api/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
}

export async function addItem(item: Item) {
    try {
        const response = await axios.post(`http://localhost:8000/api/items`, item);
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}

export const removeItem = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/items/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error removing item:", error);
        throw error;
    }
};

export const updateItem = async (id: string, item: Item) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/items/${id}`, item);
        return response.data;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
};