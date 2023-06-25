import './App.css';
import TaskManager from './componentes/TaskManager';
import logo from './logo.png';


function App() {
  return (
    <div className="App">
      <div className='logo'>
        <img src={ logo } alt='TaskManager Logo'/>
      </div>
        <TaskManager />
    </div>
  );
}

export default App;
