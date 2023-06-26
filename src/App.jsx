import React, { useEffect, useReducer } from "react";

const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return action.payload;

    case "REMOVE_LIST_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "ADD_LIST_ITEM":
      return [...state, action.payload];

    default:
      return state;
  }
};

function App() {
  const [list, dispatch] = useReducer(listReducer, []);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      if (parsedList.length > 0) {
        dispatch({ type: "SET_LIST", payload: parsedList });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function handleRemoveItemFromList(id) {
    dispatch({ type: "REMOVE_LIST_ITEM", payload: id });
  }

  function handleAddItemToList() {
    const newItem = {
       name: `Novo item ${list.length + 1}`
    };
    dispatch({ type: "ADD_LIST_ITEM", payload: newItem });
  }

  return (
    <div>
      <h1>Lista</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              style={{ margin: "10px" }}
              onClick={() => handleRemoveItemFromList(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItemToList}>Adicionar Item</button>
    </div>
  );
}

export default App;
