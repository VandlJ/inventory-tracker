import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchItems, deleteItem } from "../api/items";

const ItemList = () => {
  const queryClient = useQueryClient();

  const { data: items, isLoading, error } = useQuery("items", fetchItems);

  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("items"); // Obnov data po smazání
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Motorcycle Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category} - ${item.price}
            <button onClick={() => mutation.mutate(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
