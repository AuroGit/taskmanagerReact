import React from "react";
import '../stylesheets/Task.css'

function Task({ id, texto, deleteTask, checkTask, checked }) {
	return (
		<li 
			className={checked ? 'task checked' : 'task'} 
			key={id} 
			id={id}
		>
			<div 
				className="task-name" 
				onClick={(e) => {
					checkTask(parseInt(e.target.closest('.task').id))
				}}
			>
				<input
					type="checkbox" 
					className="check"
				/>
				<p>{ texto }</p>
			</div>
			<div 
				className="delete-btn" 
				onClick={(e) => {
					deleteTask(parseInt(e.target.closest('.task').id))
				}}
			>
				X
			</div>
		</li>
	);
}

export default Task;