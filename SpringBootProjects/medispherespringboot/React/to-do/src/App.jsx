import {useState} from "react";
import "./App.css";
function App(){

  const [task,setTask] = useState("");
  return(
    <div className="container">
      <h1>To-Do List</h1>
      <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
      />
      <button>Add</button>
      <p>You typed:{task}</p>
    </div>
  );
}

export default App;