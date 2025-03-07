import React, { useState, useEffect } from "react";

function TodoItem({ label, deleteTodo }) {
	return (
		<div className="item-list">
			<span className="todo-text">{label}</span>
			<i className="fas fa-trash-alt"  onClick={deleteTodo}/>
		</div>
	)
}

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [todoInput, setTodoInput] = useState("");

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);
	return (
		<div className="container">
			<form
				onSubmit={(ev) => {
					ev.preventDefault();
					if (todoInput.length > 0) {
						setTodos([{
							label: todoInput,
							isDone: false
						},
						...todos,
						]);
						setTodoInput("");
					}
				}}

				className="container d-flex flex-column align-items-center">

				<h1>To Do List</h1>
				<input
					className="form-control form-control-lg"
					type="text"
					placeholder="Whats pending for today?"
					aria-describedby="input field"
					value={todoInput}
					onChange={(ev) => setTodoInput(ev.target.value)}
				></input>
				{todos.map((item, idx) =>
					<TodoItem
						key={idx}
						label={item.label}
						toggleToDo={() =>
							setTodos(
								todos.toSpliced(idx, 1, {
									label: item.label,
								})
							)}
						deleteTodo={() => setTodos(todos.toSpliced(idx, 1))}
					/>
				)}
			</form>
			<small className="taskCounter">Task pending: {todos.length}</small>
		</div>
	);
};

export default Home;