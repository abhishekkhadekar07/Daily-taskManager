import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskList from './TaskList';
import { act } from 'react';

describe('TaskList Component', () => {
  const mockHandleEditTask = jest.fn();
  const mockHandleDeleteTask = jest.fn();
  const mockHandleDragTask = jest.fn();
  const mockHandleDropBetweenSection = jest.fn();
  const mockAllowDropTask = jest.fn();

  const tasks = [
    { title: 'Task 1', description: 'Description 1' },
    { title: 'Task 2', description: 'Description 2' }
  ];

  const renderComponent = (status, completedPercentage = 0) => {
    return act(() => {
      render(
        <TaskList
          status={status}
          tasks={tasks}
          handleEditTask={mockHandleEditTask}
          handleDeleteTask={mockHandleDeleteTask}
          handleDragTask={mockHandleDragTask}
          handleDropBetweenSection={mockHandleDropBetweenSection}
          allowDropTask={mockAllowDropTask}
          completedPercentage={completedPercentage}
        />
      );
    });
  };

  it('renders pending tasks with correct elements', () => {
    renderComponent('pending');
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders completed tasks with correct elements and percentage', () => {
    renderComponent('completed', 50);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('(50%)')).toBeInTheDocument();
  });

  it('calls handleEditTask when edit button is clicked', () => {
    renderComponent('pending');
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    act(() => {
      fireEvent.click(editButtons[0]);
    });
    expect(mockHandleEditTask).toHaveBeenCalledWith('pending', 0);
  });

  it('calls handleDeleteTask when delete button is clicked', () => {
    renderComponent('pending');
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    act(() => {
      fireEvent.click(deleteButtons[0]);
    });
    expect(mockHandleDeleteTask).toHaveBeenCalledWith('pending', 0);
  });

  it('calls handleDragTask when a task is dragged', () => {
    renderComponent('pending');
    const taskCard = screen.getByText('Task 1').closest('.MuiPaper-root');
    act(() => {
      fireEvent.dragStart(taskCard);
    });
    expect(mockHandleDragTask).toHaveBeenCalled();
  });

  it('calls handleDropBetweenSection on drop', () => {
    renderComponent('pending');
    const taskSection = screen.getByText('Pending').closest('.task-section');
    act(() => {
      fireEvent.drop(taskSection);
    });
    expect(mockHandleDropBetweenSection).toHaveBeenCalledWith(expect.anything(), 'pending');
  });

  it('calls allowDropTask on drag over', () => {
    renderComponent('pending');
    const taskSection = screen.getByText('Pending').closest('.task-section');
    act(() => {
      fireEvent.dragOver(taskSection);
    });
    expect(mockAllowDropTask).toHaveBeenCalled();
  });

  it('does not render edit and delete buttons for completed tasks', () => {
    renderComponent('completed');
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /delete/i })).toBeNull();
  });
});
