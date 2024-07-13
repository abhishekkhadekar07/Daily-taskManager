import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './TaskList.css';
 
const TaskList = ({
  status,
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleDragStart,
  handleDrop,
  allowDrop,
  completedPercentage,
}) => {
  const getCardClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'inProcess':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      default:
        return '';
    }
  };
 
  const getPercentageColor = (percentage) => {
    if (percentage === 0) return 'black';
    if (percentage === 100) return 'green';
    return 'orange';
  };
 
  return (
    <div className="task-section" onDrop={(e) => handleDrop(e, status)} onDragOver={allowDrop}>
      <h2>
        {status === 'pending' && 'Pending'}
        {status === 'inProcess' && 'Doing'}
        {status === 'completed' && 'Completed'}
        {status === 'completed' && (
          <span style={{ color: getPercentageColor(completedPercentage), fontSize: '0.8em' }}>
    
            ({completedPercentage.toFixed(0)}%)
          </span>
        )}
      </h2>
      {tasks.map((task, index) => (
        <Card
          key={index}
          className={`${getCardClass(status)} mb-2`}
          draggable
          onDragStart={(e) => handleDragStart(e, status, index)}
        >
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <div className="task-actions">
              {status === 'pending' && (
                <>
                  <Button  variant="light" onClick={() => handleEditTask(status, index)}>
                    <FaEdit />
                  </Button>
                  <Button className='btn__' variant="light" onClick={() => handleDeleteTask(status, index)}>
                    <FaTrashAlt />
                  </Button>
                </>
              )}
              {status === 'inProcess' && (
                <Button variant="light" onClick={() => handleDeleteTask(status, index)}>
                  <FaTrashAlt />
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
 
export default TaskList;