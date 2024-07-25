import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../App.css"
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList'


const TaskManager = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProcess: [],
    completed: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    endDate: "",
    priority: "",
  });
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskStatus, setEditTaskStatus] = useState(null);


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskList"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    setShowPopup(true);
    setNewTask({
      title: "",
      description: "",
      endDate: "",
      priority: "",
    });
    setEditTaskIndex(null);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    const updatedTasks = { ...tasks };
    if (editTaskIndex !== null && editTaskStatus !== null) {
      updatedTasks[editTaskStatus][editTaskIndex] = newTask;
    } else {
      updatedTasks.pending.push(newTask);
    }
  
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    setNewTask({
      title: "",
      description: "",
      endDate: "",
      priority: "",
    });
    setShowPopup(false);
  };

  const handleEditTask = (status, index) => {
    setShowPopup(true);
    setNewTask(tasks[status][index]);
    setEditTaskIndex(index);
    setEditTaskStatus(status);
  };

  const handleDeleteTask = (status, index) => {
    const updatedTasks = { ...tasks };
    updatedTasks[status].splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
  };

  const handleDragTask = (e, status, index) => {
    e.dataTransfer.setData("status", status);
    e.dataTransfer.setData("index", index);
  };

  const handleDropBetweenSection = (e, newStatus) => {
    const status = e.dataTransfer.getData("status");
    const index = e.dataTransfer.getData("index");
    const task = tasks[status][index];
    const updatedTasks = { ...tasks };
    updatedTasks[status].splice(index, 1);
    updatedTasks[newStatus] = [...updatedTasks[newStatus], task];
    setTasks(updatedTasks);
    console.log(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
  };

  const allowDropTask= (e) => {
    e.preventDefault();
  };

  const totalTasks =
    tasks.pending.length + tasks.inProcess.length + tasks.completed.length;
  const completedPercentage = totalTasks
    ? Math.round((tasks.completed.length / totalTasks) * 100)
    : 0;

  return (
    <div className="App">
      <div className="header">
        <h1 >Daily TaskManager</h1>
      </div>
      <div className="button-container">
        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <TaskForm
        show={showPopup}
        onHide={() => setShowPopup(false)}
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleSaveTask={handleSaveTask}
        editTaskIndex={editTaskIndex}
    
      />
      <div className="task-sections">
        {["pending", "inProcess", "completed"].map((status) => (
          <TaskList
            key={status}
            tasks={tasks[status]}
            status={status}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleDragTask={handleDragTask}
            handleDropBetweenSection={handleDropBetweenSection}
            allowDropTask={allowDropTask}
            completedPercentage={completedPercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
