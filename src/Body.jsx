import NavBar from './components/NavBar'
import { Outlet } from 'react-router'

const Body = () => {
  return (  <>
    <NavBar />
   <Outlet />
  </>
  )
}
