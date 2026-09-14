import React from 'react'
import {router} from './app.routes'
import {RouterProvider} from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth';
import ThemeProvider from './ThemeProvider';


const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, [])

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App