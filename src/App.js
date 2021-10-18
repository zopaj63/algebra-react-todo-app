import TodoItemForm from "./components/TodoItemForm";
import { useState } from "react";

function App() {
  const [itemObject, setItemObject] = useState(null);

  return (
    <TodoItemForm onSubmitItem={setItemObject} />
  );
}

export default App;