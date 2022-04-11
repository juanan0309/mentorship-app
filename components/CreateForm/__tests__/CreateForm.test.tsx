import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import CreateForm from '..'

describe('Home Page', () => {
  it('renders a search bar', async () => {
    const useRouter = jest.fn(
      () =>
        ({
          query: {},
        } as any),
    )

    const router = useRouter()
    render(<CreateForm router={router} session={null} />)

    const form = screen.getByText(/submit/i)

    expect(form).toBeInTheDocument()
  })
})
