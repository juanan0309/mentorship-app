import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { Session } from "next-auth";

import CreateForm from '..'

const useRouter = jest.fn(
  () =>
    ({
      query: {},
    } as any),
)

afterEach(() =>{
  console.log('afterEach')
  jest.resetModules()
})

describe('Component form behaviors', () => {

  const router = useRouter()

  it('renders a search bar', async () => {
    const mockSession: Session = {
      expires: "1",
      user: { email: "a", name: "Delta", image: "c" },
    };

    const user = userEvent.setup()
    render(<CreateForm router={router} session={mockSession} />)

    const form = screen.getByText(/submit/i)

    expect(form).toBeInTheDocument()

    // await user.click(screen.getByText(/submit/i))

    // expect(form).toBeInTheDocument()

    // const missingTitle = await screen.getByText(/Title is required/i)
    // const missingClient = await screen.getByText(/Client is required/i)
    // const missingContent = await screen.getByText(/Content is required/i)

    // await waitFor(() => {
    //   expect(missingTitle).toBeInTheDocument()
    //   expect(missingClient).toBeInTheDocument()
    //   expect(missingContent).toBeInTheDocument()
    // })
  })
})
