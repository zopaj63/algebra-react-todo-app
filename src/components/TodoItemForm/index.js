import { useState } from "react";

export default function TodoItemForm({ onSubmitItem }) {

    const [todoState, setTodoState] = useState([]);
    const [formState, setFormState] = useState({ text: "" });

    const handleOnChange = (event) => {
        event.preventDefault();
        setFormState((formState) => ({
            ...formState,
            [event.target.name]: event.target.value,
        }));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        onSubmitItem(formState);
        setTodoState(todoState => [
            ...todoState,
            { ...formState, isDone: false }
        ]);
        setFormState({ text: "" });
    }

    const handleOnDelete = (item, index) => (event) => {
        setTodoState((todoState) => [
            ...todoState.slice(0, index),
            ...todoState.slice(index + 1),
        ]);
    }

    const handleOnToggle = (item, index) => (event) => {
        setTodoState((todoState) => [
            ...todoState.slice(0, index),
            { ...item, isDone: !item.isDone },
            ...todoState.slice(index + 1),
        ]);
    }

    return (
        <div>
            <div>
                {todoState.map((item, index) =>
                    <div key={index}>
                        <button type="button"
                            onClick={handleOnToggle(item, index)}
                        >
                            {item.isDone ? "Mark as todo" : "Mark as done"}
                        </button>
                        {item.text}
                        <button type="button"
                            onClick={handleOnDelete(item, index)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <form onSubmit={handleOnSubmit}>
                <input name="text" type="text" placeholder="Item text"
                    onChange={handleOnChange}
                    value={formState.text}
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}