// import { cleanup, fireEvent, render } from '@testing-library/react'
// import TaskList from './TaskList'
// describe('Testing Form component', () => {
//   afterEach(() => {
//     cleanup()
//   })

//   it("testing default behaviour of TaskList", () => {
//     const { container } = render(<TaskList />)
//     expect(container).toBeInTheDocument()
//     expect(container).toBeTruthy()
//   })

//   it('renders "Pending" title for pending tasks', () => {
//     const tasks = [];
//     render(<TaskList status="pending" tasks={tasks} />);
//     const title = screen.getByRole('heading', { name: /pending/i });
//     expect(title).toBeInTheDocument();
//   })


// })

import { cleanup, fireEvent,screen, getByTestId, render } from '@testing-library/react'
import TaskList from './TaskList';

describe('Testing tasklist  component', () => {
  afterEach(() => {
    cleanup()
  })
  it("testing default behaviour of TaskList", () => {
    const { container } = render(<TaskList />)
    expect(container).toBeInTheDocument()
    expect(container).toBeTruthy()
  })
})