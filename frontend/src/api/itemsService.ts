import { Item } from '../types';

//const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://109.164.63.64:8000';
//const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://storagegrid.eu:8000';

export const getItems = async (): Promise<Item[]> => {
    const response = await fetch(`${API_URL}/api/items/`);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    return response.json();
};

export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
    const response = await fetch(`${API_URL}/api/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Failed to add item');
    }
    return response.json();
};

export const updateItem = async (id: number, item: Partial<Item>): Promise<Item> => {
    const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Failed to update item');
    }
    return response.json();
};

export const removeItem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete item');
    }
};
