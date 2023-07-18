import React from "react";
import '../stylesheets/RemoveDoneTasks.css';

function RemoveDoneTasks({ removeDoneTasks, removeAllTasks, activeRDTBtn, activeCLBtn }) {

    return (
        <div className="rdt-btn-container">
            <button className={activeRDTBtn ? 'rdt-btn active' : 'rdt-btn'}
                onClick={ () => removeDoneTasks() }>
                Borrar tareas completadas
            </button>
            <button className={activeCLBtn ? 'rdt-btn active' : 'rdt-btn'}
                onClick={ () => removeAllTasks() }>
                Limpiar Todo
            </button>
        </div>
    );
}

export default RemoveDoneTasks;