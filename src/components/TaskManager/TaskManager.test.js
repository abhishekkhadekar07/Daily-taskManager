import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
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

});
