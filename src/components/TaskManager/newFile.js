import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskManager from "./TaskManager";

describe("TaskManager Component", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("renders TaskManager component", () => {
        render(<TaskManager />);
        expect(screen.getByText(/Daily TaskManager/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
    });

    test("opens TaskForm popup on Add Task button click", async () => {
        render(<TaskManager />);
        fireEvent.click(screen.getByText(/Add Task/i));
        await waitFor(() => {
            expect(screen.getByText(/Save/i)).toBeInTheDocument(); // Ensure Save button is in the popup
        });
    });

    test("closes TaskForm popup", async () => {
        render(<TaskManager />);
        fireEvent.click(screen.getByText(/Add Task/i));
        await waitFor(() => {
            expect(screen.getByText(/Save/i)).toBeInTheDocument(); // Ensure Save button is in the popup
        });
        fireEvent.click(screen.getByText(/Close/i)); // Close button in TaskForm
        await waitFor(() => {
            expect(screen.queryByText(/Save/i)).not.toBeInTheDocument(); // Save button should no longer be in the popup
        });
    });

    test("adds a new task", async () => {
        render(<TaskManager />);
        fireEvent.click(screen.getByText(/Add Task/i));

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "New Task" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Task description" } }); // Assuming description field exists
        fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: "2024-12-31" } }); // Assuming endDate field exists
        fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: "High" } }); // Assuming priority field exists

        fireEvent.click(screen.getByText(/Save/i)); // Click the save button to add task

        await waitFor(() => {
            expect(screen.getByText(/New Task/i)).toBeInTheDocument(); // Verify task was added
        });
    });

    test("edits an existing task", async () => {
        // Initialize with a task
        localStorage.setItem("taskList", JSON.stringify({
            pending: [{ title: "Old Task", description: "", endDate: "", priority: "" }],
            inProcess: [],
            completed: []
        }));

        render(<TaskManager />);

        fireEvent.click(screen.getByText(/Edit/i)); // Assuming TaskList has an edit button

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Updated Task" } });
        fireEvent.click(screen.getByText(/Save/i)); // Click the save button to save changes

        await waitFor(() => {
            expect(screen.getByText(/Updated Task/i)).toBeInTheDocument(); // Verify the task was updated
        });
    });

    test("deletes a task", async () => {
        // Initialize with a task
        localStorage.setItem("taskList", JSON.stringify({
            pending: [{ title: "Task to be deleted", description: "", endDate: "", priority: "" }],
            inProcess: [],
            completed: []
        }));

        render(<TaskManager />);

        fireEvent.click(screen.getByText(/Delete/i)); // Assuming TaskList has a delete button

        await waitFor(() => {
            expect(screen.queryByText(/Task to be deleted/i)).not.toBeInTheDocument(); // Verify the task was deleted
        });
    });

    test("drags and drops a task", async () => {
        // Initialize with tasks
        localStorage.setItem("taskList", JSON.stringify({
            pending: [{ title: "Task to move", description: "", endDate: "", priority: "" }],
            inProcess: [],
            completed: []
        }));

        render(<TaskManager />);

        // Simulate drag and drop
        const task = screen.getByText(/Task to move/i);
        fireEvent.dragStart(task);

        // Simulate drop action - assume "In Process" section exists
        const dropZone = screen.getByText(/In Process/i);
        fireEvent.dragOver(dropZone);
        fireEvent.drop(dropZone);

        await waitFor(() => {
            expect(screen.queryByText(/Task to move/i)).not.toBeInTheDocument(); // Verify task was removed from the original list

            // expect(screen.getByText(/Task to move/i)).toBeInTheDocument(); // Verify task was added to the new list
        });
    });

    test("loads tasks from localStorage", () => {
        localStorage.setItem("taskList", JSON.stringify({
            pending: [{ title: "Loaded Task", description: "", endDate: "", priority: "" }],
            inProcess: [],
            completed: []
        }));

        render(<TaskManager />);
        expect(screen.getByText(/Loaded Task/i)).toBeInTheDocument(); // Verify the task was loaded
    });
});
