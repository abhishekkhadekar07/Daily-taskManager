import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const TaskForm = ({
  show,
  onHide,
  newTask,
  handleInputChange,
  handleSaveTask,
  editTaskIndex,
}) => {
  return (
    <Dialog open={show} onClose={onHide}>
      <DialogTitle>{editTaskIndex !== null ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            id='title'
            data-testid='title'
            margin="normal"
            label="Title"
            type="text"
            name="title"
            value={newTask?.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required
          />
          <TextField
            fullWidth
            id='Description'
            margin="normal"
            label="Description"
            type="text"
            name="description"
            value={newTask?.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />
          <TextField
            fullWidth
            id='endDate'
            margin="normal"
            label="End Date"
            type="date"
            name="endDate"
            value={newTask?.endDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            id='Priority'
            margin="normal"
            label="Priority"
            select
            name="priority"
            value={newTask?.priority}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onHide}
          id='closeButton'
          className='closeButton'
          data-testid='closeButton'
          color="secondary"
          variant="outlined"
          sx={{
            color: 'white',
            backgroundColor: '#f50057',
            '&:hover': {
              backgroundColor: '#c51162',
            },
            borderRadius: 50,
            padding: '8px 16px',
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSaveTask}
          color="primary"
          variant="contained"
          sx={{ borderRadius: 50, padding: '8px 16px' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
