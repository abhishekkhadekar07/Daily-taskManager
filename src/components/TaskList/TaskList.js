import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './TaskList.css';

const TaskList = ({
  status,
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleDragTask,
  handleDropBetweenSection,
  allowDropTask,
  completedPercentage,
}) => {
  const getCardClassColor = (status) => {
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
    <div className="task-section" onDrop={(e) => handleDropBetweenSection(e, status)} onDragOver={allowDropTask}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '10px', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>
        {status === 'pending' && 'Pending'}
        {status === 'inProcess' && 'Doing'}
        {status === 'completed' && 'Completed'}
        {status === 'completed' && (
          <span style={{ color: getPercentageColor(completedPercentage), fontSize: '0.8em', marginLeft: '10px' }}>
            ({completedPercentage.toFixed(0)}%)
          </span>
        )}
      </Typography>
      {tasks.map((task, index) => (
        <Card
          key={index}
          className={`${getCardClassColor(status)} mb-2`}
          draggable
          onDragStart={(e) => handleDragTask(e, status, index)}
          sx={{ marginBottom: 2 }}
        >
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
          </CardContent>
          <CardActions>
            {status === 'pending' && (
              <>
                <IconButton aria-label="edit" onClick={() => handleEditTask(status, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteTask(status, index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            {status === 'inProcess' && (
              <IconButton aria-label="delete" onClick={() => handleDeleteTask(status, index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
