import React from "react";
import '../stylesheets/RemoveDoneTasks.css';

function RemoveDoneTasks({ tasks, removeDoneTasks, active }) {

    return (
        <div className="rdt-btn-container">
            <button className={active ? 'rdt-btn active' : 'rdt-btn'}
                onClick={ () => removeDoneTasks() }>
                Borrar tareas completadas
            </button>
        </div>
    );
}

export default RemoveDoneTasks;