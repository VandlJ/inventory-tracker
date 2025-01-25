"use client";

import React, { useEffect, useState } from 'react';
import { getItems, addItem, removeItem, updateItem } from '../api/itemsService';
import { Item, StatusEnum } from '../types';

const MainPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({
        name: '',
        price: 0,
        status: 'on_stock'
    });
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    useEffect(() => {
        document.title = "Inventory Tracker";
        const fetchItems = async () => {
            try {
                const data = await getItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    const handleRemoveItem = async (id: number) => {
        try {
            await removeItem(id);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleAddItem = async () => {
        try {
            const addedItem = await addItem(newItem);
            setItems(prevItems => [...prevItems, addedItem]);
            setNewItem({
                name: '',
                price: 0,
                status: 'on_stock'
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
                setItems(prevItems => prevItems.map(item => (item.id === editingItem.id ? editingItem : item)));
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

    const getStatusColor = (status: StatusEnum): string => {
        switch (status) {
            case 'on_stock':
                return "bg-green-500";
            case 'ordered':
                return "bg-yellow-500";
            case 'planned':
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const sortItemsByStatus = (items: Item[]): Item[] => {
        const statusPriority: Record<StatusEnum, number> = {
            planned: 1,
            ordered: 2,
            on_stock: 3
        };

        return items.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
    };

    const calculateTotalCost = (items: Item[]): number => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    const formatPrice = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            <nav className="bg-gray-800 p-4 shadow-lg">
                <h1 className="text-3xl font-bold">Inventory Manager</h1>
            </nav>
            <div className="p-5 flex flex-col lg:flex-row lg:justify-start lg:items-start lg:space-x-8">
                <div className="lg:w-1/3 flex-shrink-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">Add Item</h2>
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
                                placeholder="Price"
                                value={newItem.price === 0 ? '' : newItem.price}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setNewItem({ ...newItem, price: value });
                                    }
                                }}
                                className="w-full p-3 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <select
                                value={newItem.status}
                                onChange={(e) => setNewItem({ ...newItem, status: e.target.value as StatusEnum })}
                                className="w-full p-3 rounded-lg shadow-inner bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="on_stock">On Stock</option>
                                <option value="ordered">Ordered</option>
                                <option value="planned">Planned</option>
                            </select>
                            <button onClick={handleAddItem} className="w-full p-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 lg:w-2/3">
                    <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between border-2 border-green-500">
                        <span className="text-xl font-bold">Total Cost:</span>
                        <span className="text-xl font-bold text-green-400">{formatPrice(calculateTotalCost(items))} Kč</span>
                    </div>
                    <ul className="space-y-4">
                        {sortItemsByStatus(items).map(item => (
                            <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between max-w-full">
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
                                            value={editingItem?.price}
                                            onChange={(e) => setEditingItem({ ...editingItem!, price: parseFloat(e.target.value) })}
                                            className="w-full p-2 rounded-lg shadow-inner bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <select
                                            value={editingItem?.status}
                                            onChange={(e) => setEditingItem({ ...editingItem!, status: e.target.value as StatusEnum })}
                                            className="w-full p-2 rounded-lg shadow-inner bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="on_stock">On Stock</option>
                                            <option value="ordered">Ordered</option>
                                            <option value="planned">Planned</option>
                                        </select>
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={handleSaveItem} className="w-full p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                                                Save
                                            </button>
                                            <button onClick={handleCancelEdit} className="w-full p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg shadow hover:scale-105 transform transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between flex-1 overflow-hidden">
                                        <div className="flex items-center space-x-2 flex-1">
                                            <div className={`w-3 h-3 flex-shrink-0 rounded-full ${getStatusColor(item.status)}`}></div>
                                            <h3 className="text-lg font-bold truncate" style={{ maxWidth: '70%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                                        </div>
                                        <p className="text-lg font-bold flex-shrink-0">{formatPrice(item.price)} Kč</p>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 ml-4">
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
        </div>
    );
};

export default MainPage;