import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PaginationButtons from '..'

describe('Pagination Buttons', () => {
    
  it('renders the buttons correctly', async () => {
    const comProps = {
        handleNextPage: jest.fn(),
        handlePreviousPage: jest.fn(),
        nextButtonActive: false,
        previousButtonActive: false,
      }
    render(
      <PaginationButtons
        {...comProps}
      />,
    )
    const next = screen.getByText(/Next/i)
    const previous = screen.getByText(/Previous/i)

    expect(next).toBeInTheDocument()
    expect(previous).toBeInTheDocument()
  })

  it('renders the buttons activated', async () => {
    const comProps = {
        handleNextPage: jest.fn(),
        handlePreviousPage: jest.fn(),
        nextButtonActive: true,
        previousButtonActive: true,
      }
    render(
      <PaginationButtons
        {...comProps}
      />,
    )
    const next = screen.getByText(/Next/i)
    const previous = screen.getByText(/Previous/i)

    expect(next).toHaveStyle('backgroundColor: "#E94E44"')
    expect(previous).toHaveStyle('backgroundColor: "#E94E44"')
  })

})