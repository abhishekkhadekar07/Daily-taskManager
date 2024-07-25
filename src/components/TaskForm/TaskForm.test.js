import { cleanup, fireEvent,screen, getByTestId, render } from '@testing-library/react'
import TaskForm from './TaskForm';

describe('Testing Form component', () => {
  afterEach(() => {
    cleanup()
  })

  it("testing default behaviour of form", () => {
    const { container } = render(<TaskForm />)
    expect(container).toBeInTheDocument()
    expect(container).toBeTruthy()
  }) 
  it('form renders properly', () => {
    const title = screen.findAllByRole('textbox', { name: /title/i });
    const description = screen.findAllByRole('textbox', { name: /description/i });
    const endDate = screen.findAllByLabelText('End Date *')
    const priority = screen.findAllByRole('combobox', { name: /priority/i })
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(endDate).toBeTruthy();
    expect(priority).toBeTruthy();
  });
  // it('calls handleInputChange when input values change', () => {
  //   const handleInputChange = jest.fn();
  //   render(<TaskForm show={true} handleInputChange={handleInputChange} />);
  //   const titleInput = screen.getByPlaceholderText('Enter title');
  //   fireEvent.change(titleInput, "new title");
  //   expect(handleInputChange).toHaveBeenCalledWith(expect.objectContaining({ target: { name: 'title', value: 'new title' } }));
  // });

  it('renders "add task " title when edittaskindex is null', () => {
    render(<TaskForm show={true} editTaskIndex={null} />);
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('Add Task');
  })

  it('renders "edit task" title when editaskIndex is not null', () => {
    render(<TaskForm show={true} editTaskIndex={1} />);
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('Edit Task')
  })

  it('calls handleSaveTask when save button is clicked', () => {
    const handleSaveTask = jest.fn();
    render(<TaskForm show={true} handleSaveTask={handleSaveTask} />);
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    expect(handleSaveTask).toHaveBeenCalled();
  })
  it("calls onHide when close button is clicked", () => {
    const onHide = jest.fn();
    render(<TaskForm show={true} onHide={onHide} />);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    expect(onHide).toHaveBeenCalled();
})
})