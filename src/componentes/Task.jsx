import React, { useRef, useState } from "react";
import '../stylesheets/Task.css'

function Task({ id, texto, deleteTask, toggleDoneTask, checked }) {
	
	const taskRef = useRef(null);
	const [name, setName] = useState(texto);
	const [readOnly, setReadOnly] = useState(true)
	const [onEdit, setOnEdit] = useState(false);

	const setToEdit = () => {
		setOnEdit(true);
		setReadOnly(false);
		taskRef.current.focus();
	}

	return (
		<li key={id} id={id}
			className={checked ? 'task checked' : 'task'}>

			<div className="task-name">
				<input
					type="checkbox" 
					className="check"
					onClick={(e) => {
						!onEdit &&
						toggleDoneTask(parseInt(e.target.closest('.task').id))
					}}	/>

				<input 
					ref={taskRef}
					type="text" 
					className="task-text"
					value={ name }
					readOnly={ readOnly }
					onChange={ (e) => setName(e.target.value) }/>
			</div>

			<div className="buttons">
				<button 
					className="edit-btn"
					onClick={ () => {
						if (onEdit) {
							setReadOnly(true);
							setOnEdit(false);
						} else setToEdit(texto);
						} }>
						{onEdit ? 'Hecho' : 'Editar'}
				</button>
				<div 
					className="delete-btn" 
					onClick={(e) => {
						deleteTask(parseInt(e.target.closest('.task').id))
					}}>
						X
				</div>
			</div>
		</li>
	);
}

export default Task;