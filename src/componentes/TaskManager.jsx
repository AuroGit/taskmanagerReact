import React, { useState, useEffect, useReducer } from "react";
import TaskInput from "./TaskInput";
import Task from "./Task";
import RemoveDoneBtn from "./RemoveDoneBtn";
import '../stylesheets/TaskManager.css';

function TaskManager() {

	const savedList = JSON.parse(window.localStorage.getItem('current'));
	const [list, setList] = useState(savedList || []);
	const [activeRDTBtn, setActiveRDTBtn] = useState(false);
	const [activeCLBtn, setActiveCLBtn] = useState(false);

	const reducer = (state, action) => {
		switch (action.type) {
			case 'add':
				return [...state, action.payload];
			case 'delete':
				return state.filter((item) => item.id != action.payload);
			case 'toggle':
				return state.map((item) => {
					if (item.id == action.payload) {
						return {...item, checked: !item.checked};
					}
					return item;
				});
			case 'clear-done':
				return state.filter((item) => !item.checked);
			case 'delete-all':
				return [];
		}
	};

	const [state, dispatch] = useReducer(reducer, list);

	const addToList = task => {
		dispatch({type:'add', payload:task});
	};
	const deleteFromList = id => {
		dispatch({type:'delete', payload:id});
	};
	const toggleDoneTask = id => {
		dispatch({type:'toggle', payload:id});
	};
	const removeDoneTasks = () => {
		dispatch({type:'clear-done'});
	};
	const removeAllTasks = () => {
		dispatch({type:'delete-all'});
	};

	useEffect(() => {
		if (savedList) {
			setList(savedList);
			savedList.length > 0 && setActiveCLBtn(true);
			savedList.filter((item) => item.checked).length > 0 &&
			setActiveRDTBtn(true);
		}
	}, []);
	useEffect(() => {
		window.localStorage.setItem('current', JSON.stringify(state));

		state.filter((item) => item.checked).length > 0 ?
		setActiveRDTBtn(true) : setActiveRDTBtn(false);
		state.length === 0 ? setActiveCLBtn(false) : setActiveCLBtn(true);
	}, [state]);

   return <div className="tasklist-container">
		<TaskInput addTask={ addToList } />
		<ul className="tasklist">
			{
				state.map((item) => {
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
}

export default TaskManager;