import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./pages/ItemList";
import AddItem from "./components/AddItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
