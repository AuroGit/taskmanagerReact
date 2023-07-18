import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import RemoveDoneBtn from "./RemoveDoneBtn";
import '../stylesheets/TaskManager.css';

function TaskManager() {

	const savedList = JSON.parse(window.localStorage.getItem('current'));
	const [list, setList] = useState(savedList || []);
	const [activeRDTBtn, setActiveRDTBtn] = useState(false);
	const [activeCLBtn, setActiveCLBtn] = useState(false);
	
	useEffect(() => {
		savedList &&
		setList(savedList);
		savedList.length > 0 && setActiveCLBtn(true);
		savedList.filter((item) => item.checked).length > 0 &&
		setActiveRDTBtn(true);
	}, []);
	useEffect(() => {
		window.localStorage.setItem('current', JSON.stringify(list));
	}, [list]);

	const addToList = (task) => {
		task.id = Date.now();
		setList([task, ...list]);
		setActiveCLBtn(true);
	};
	const deleteFromList = (id) => {
		const newList = list.filter((item) => item.id !== id)
		setList(newList);

		newList.filter((item) => item.checked).length > 0 ?
		setActiveRDTBtn(true) : setActiveRDTBtn(false);
		newList.length === 0 && setActiveCLBtn(false);
	};
	const toggleDoneTask = (id)=> {
		const newList = list.map(item => {
			if (item.id === id) item.checked = !item.checked;
			return item;
		});
		setList(newList);

		newList.filter((item) => item.checked).length > 0 ?
		setActiveRDTBtn(true) : setActiveRDTBtn(false);
	};
	const removeDoneTasks = () => {
        const newList = list.filter((item) => !item.checked);
        setList(newList);
		setActiveRDTBtn(false);
		newList.length === 0 && setActiveCLBtn(false);
   	};
	const removeAllTasks = () => {
        setList([]);
		setActiveRDTBtn(false);
		setActiveCLBtn(false);
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
				activeRDTBtn={ activeRDTBtn }
				activeCLBtn={ activeCLBtn }
				tasks={ list } 
				removeAllTasks={ removeAllTasks }
				removeDoneTasks={ removeDoneTasks }/>
      </div>
   );
}

export default TaskManager;