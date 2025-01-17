import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "../api/items";

const AddItem = () => {
  const [formData, setFormData] = useState({ name: "", category: "", price: 0 });
  const queryClient = useQueryClient();

  const mutation = useMutation(createItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      setFormData({ name: "", category: "", price: 0 });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
