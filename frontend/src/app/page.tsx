"use client";

import React, { useEffect, useState } from 'react';
import { getItems, addItem, removeItem, updateItem } from '../api/itemsService';

interface Item {
    id?: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    created_at?: string;
    updated_at?: string;
}

const MainPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({
        name: '',
        quantity: 0,
        price: 0,
        category: ''
    });
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    useEffect(() => {
        async function fetchItems() {
            try {
                const data = await getItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
        fetchItems();
    }, []);

    const handleRemoveItem = async (id: string) => {
        try {
            await removeItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleAddItem = async () => {
        try {
            const addedItem = await addItem(newItem);
            setItems([...items, addedItem]);
            setNewItem({
                name: '',
                quantity: 0,
                price: 0,
                category: ''
            });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleEditItem = (item: Item) => {
        setEditingItemId(item.id!);
        setEditingItem(item);
    };

    const handleSaveItem = async () => {
        if (editingItem) {
            try {
                await updateItem(editingItem.id!, editingItem);
                setItems(items.map(item => (item.id === editingItem.id ? editingItem : item)));
                setEditingItemId(null);
                setEditingItem(null);
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditingItem(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 underline decoration-wavy decoration-gray-700">Inventory Management</h1>
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full p-3 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                        className="w-full p-3 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        className="w-full p-3 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button onClick={handleAddItem} className="w-full p-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                        Add Item
                    </button>
                </div>
            </div>
            
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Inventory Items</h2>
                <ul className="space-y-4">
                    {items.map(item => (
                        <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
                            {editingItemId === item.id ? (
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="text"
                                        value={editingItem?.name}
                                        onChange={(e) => setEditingItem({ ...editingItem!, name: e.target.value })}
                                        className="w-full p-2 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        value={editingItem?.quantity}
                                        onChange={(e) => setEditingItem({ ...editingItem!, quantity: parseInt(e.target.value) })}
                                        className="w-full p-2 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        value={editingItem?.price}
                                        onChange={(e) => setEditingItem({ ...editingItem!, price: parseFloat(e.target.value) })}
                                        className="w-full p-2 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex space-x-2">
                                        <button onClick={handleSaveItem} className="w-full p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                                            Save
                                        </button>
                                        <button onClick={handleCancelEdit} className="w-full p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-400">Quantity: {item.quantity} - Price: {item.price}Kč</p>
                                </div>
                            )}
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handleEditItem(item)}
                                    className="p-2 bg-blue-500 text-white rounded-lg shadow hover:scale-105 transform transition"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleRemoveItem(item.id!)}
                                    className="p-2 bg-red-500 text-white rounded-lg shadow hover:scale-105 transform transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;