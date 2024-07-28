import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskManager from './TaskManager';

// Mock the TaskForm and TaskList components
jest.mock('../TaskForm/TaskForm', () => ({ show, onHide, newTask, handleInputChange, handleSaveTask }) => (
  show && (
    <div>
      <input
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button onClick={handleSaveTask}>Save Task</button>
      <button onClick={onHide}>Cancel</button>
    </div>
  )
));

jest.mock('../TaskList/TaskList', () => ({ tasks, status, handleEditTask, handleDeleteTask, handleDragTask, handleDropBetweenSection, allowDropTask, completedPercentage }) => (
  <div>
    <h2>{status}</h2>
    {tasks.map((task, index) => (
      <div key={index} draggable onDragStart={(e) => handleDragTask(e, status, index)}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button onClick={() => handleEditTask(status, index)}>Edit</button>
        <button onClick={() => handleDeleteTask(status, index)}>Delete</button>
      </div>
    ))}
    {status === 'completed' && (
      <div>Completed: {completedPercentage}%</div>
    )}
  </div>
));

describe('TaskManager Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // it('renders the component with initial elements', () => {
  //   render(<TaskManager />);
  //   expect(screen.getByText('Daily TaskManager')).toBeInTheDocument();
  //   expect(screen.getByText('Add Task')).toBeInTheDocument();
  // });

  it('opens the task form when Add Task button is clicked', () => {
    render(<TaskManager />);
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('adds a new task to the pending list', async () => {
    render(<TaskManager />);
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText('Save Task'));

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
      expect(screen.getByText('New Description')).toBeInTheDocument();
    });
  });

  it('edits an existing task', async () => {
    const initialTasks = {
      pending: [{ title: 'Task 1', description: 'Description 1' }],
      inProcess: [],
      completed: []
    };
    localStorage.setItem('taskList', JSON.stringify(initialTasks));

    render(<TaskManager />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated Description' } });
    fireEvent.click(screen.getByText('Save Task'));

    await waitFor(() => {
      expect(screen.getByText('Updated Task')).toBeInTheDocument();
      expect(screen.getByText('Updated Description')).toBeInTheDocument();
    });
  });

  it('deletes a task from the pending list', async () => {
    const initialTasks = {
      pending: [{ title: 'Task 1', description: 'Description 1' }],
      inProcess: [],
      completed: []
    };
    localStorage.setItem('taskList', JSON.stringify(initialTasks));

    render(<TaskManager />);
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).toBeNull();
      expect(screen.queryByText('Description 1')).toBeNull();
    });
  });

  it('handles drag and drop between sections', async () => {
    const initialTasks = {
      pending: [{ title: 'Task 1', description: 'Description 1' }],
      inProcess: [],
      completed: []
    };
    localStorage.setItem('taskList', JSON.stringify(initialTasks));

    render(<TaskManager />);
    const task = screen.getByText('Task 1').closest('div[draggable]');
    fireEvent.dragStart(task);
    const inProcessSection = screen.getByText('inProcess');
    fireEvent.drop(inProcessSection);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Description 1')).toBeInTheDocument();
    });
  });
});
