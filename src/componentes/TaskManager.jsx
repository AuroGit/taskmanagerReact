import React, { useState } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import '../stylesheets/TaskManager.css';

function TaskManager() {
	const [list, setList] = useState([]);

	const addToList = (task) => {
		task.id = list.length > 0 ? list[0].id + 1 : 0;
		setList([task, ...list]);
	};
	const deleteFromList = (id) => {
		const newList = list.filter((item) => item.id !== id)
		setList(newList);
	};
	const checkTask = (id)=> {
		const newList = list.map(item => {
			if (item.id === id) item.checked = !item.checked;
			return item;
		});
		setList(newList);
	};

   return (
      <div className="tasklist-container">
			<TaskInput addTask={ addToList } />
			<ul className="tasklist">
				{
					list.map((item) => {
						return (
							<Task 
								key={item.id} 
								id={item.id} 
								texto={item.texto}
								checked={item.checked}
								deleteTask={deleteFromList}
								checkTask={checkTask}
							/>
						)
					})
				}
			</ul>
      </div>
   );
}

export default TaskManager;