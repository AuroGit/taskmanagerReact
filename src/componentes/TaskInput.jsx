import React, { useState } from "react";
import '../stylesheets/TaskInput.css';

function TaskInput({ addTask }) {
	const [input, setInput] = useState('');

	return (
		<div id="task-input">
			<input 
				type="text"
				placeholder="...Nueva Tarea"
				maxLength={180}
				value={ input }
				onChange={(e) => setInput(e.target.value)}
			/>

			<button 
				className="add-task-btn"
				onClick={()=> {
					if (input) {
						addTask({
							id:'', 
							texto: input.trim(), 
							checked:false
						});
						setInput('');
					}
				}}
			>
				+
			</button>
		</div>
	);
}

export default TaskInput;