import { createLazyFileRoute } from '@tanstack/react-router'
import { login } from '../../connection/user'

export const Route = createLazyFileRoute('/login/')({
  component: () => <>
    <button 
    onClick={() => {
      login('email', 'password')
    }}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute mt-80">
      Button
    </button>
  </>
})