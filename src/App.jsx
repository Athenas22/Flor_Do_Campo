import './App.css'
import { router } from './routes'
import { RouterProvider } from '@tanstack/react-router'

function App() {
  return <RouterProvider router={router} />
}

export default App
