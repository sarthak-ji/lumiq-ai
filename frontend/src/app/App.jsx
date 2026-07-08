import React from 'react'
import {router} from './app.routes'
import {RouterProvider} from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth';


const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App