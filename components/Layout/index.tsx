import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import NavBar from './NavBar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
