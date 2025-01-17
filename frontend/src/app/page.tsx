"use client";

import React, { useEffect, useState } from 'react';
import { getItems, addItem } from '../api/itemsService';

interface Item {
    id?: string;
    name: string;
    category: string;
    price: number;
    status?: string;
    notes?: string;
}

const MainPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({id: '', name: '', category: '', price: 0, status: '', notes: ''});

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

    const handleAddItem = async () => {
        try {
            const addedItem = await addItem(newItem);
            setItems([...items, addedItem]);
            setNewItem({id: '', name: '', category: '', price: 0, status: '', notes: ''});
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <h1>Add New Item</h1>
            <input
                type="text"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newItem.status}
                onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            />
            <input
                type="text"
                placeholder="Notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
            />
            <button onClick={handleAddItem}>Add Item</button>
            <h1>Inventory Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - Category: {item.category} - Price: {item.price}Kč
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;