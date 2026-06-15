import React from 'react'
import {router} from './app.routes'
import {RouterProvider} from 'react-router'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App