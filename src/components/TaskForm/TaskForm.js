import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskForm = ({
  show,
  onHide,
  newTask,
  handleInputChange,
  handleSaveTask,
  editTaskIndex,

}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="Title_">
          {editTaskIndex !== null ? "Edit Task" : "Add Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label> Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Enter  title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Enter  description"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="ChooseEndDate"
              value={newTask.ChooseEndDate}
              onChange={handleInputChange}
              placeholder="Choose End Date"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority </Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              placeholder="choose priority"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveTask}
   
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
