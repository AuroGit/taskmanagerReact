import React, { useState } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import RemoveDoneBtn from "./RemoveDoneBtn";
import '../stylesheets/TaskManager.css';

function TaskManager() {
	const [list, setList] = useState([]);
	const [activeBtn, setActiveBtn] = useState(false);

	const addToList = (task) => {
		task.id = Date.now();
		setList([task, ...list]);
	};
	const deleteFromList = (id) => {
		const newList = list.filter((item) => item.id !== id)
		setList(newList);

		newList.filter((item) => item.checked).length > 0 ?
		setActiveBtn(true) : setActiveBtn(false);
	};
	const toggleDoneTask = (id)=> {
		const newList = list.map(item => {
			if (item.id === id) item.checked = !item.checked;
			return item;
		});
		setList(newList);

		newList.filter((item) => item.checked).length > 0 ?
		setActiveBtn(true) : setActiveBtn(false);
	};
	const removeDoneTasks = () => {
        const newList = list.filter((item) => !item.checked);
        setList(newList);
		  setActiveBtn(false);
   };

   return (
      <div className="tasklist-container">
			<TaskInput addTask={ addToList } />
			<ul className="tasklist">
				{
					list.map((item) => {
						return (
							<Task 
								key={ item.id }
								id={ item.id }
								texto={ item.texto }
								checked={ item.checked }
								deleteTask={ deleteFromList }
								toggleDoneTask={ toggleDoneTask }
							/>
						)
					})
				}
			</ul>
			<RemoveDoneBtn 
				active={ activeBtn }
				tasks={ list } 
				removeDoneTasks={ removeDoneTasks }/>
      </div>
   );
}

export default TaskManager;