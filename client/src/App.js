import './App.css'
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Items from './pages/Items'
import CardPage from './pages/CardPage'
import DefaultLayout from './components/DefaultLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Bills from './pages/Bills'
import Customers from './pages/Customers'
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectRouter>
                <DefaultLayout />
              </ProtectRouter>
            }
          >
            <Route index element={<HomePage />} />
            <Route path='/products' element={<Items />} />
            <Route path='/cart' element={<CardPage />} />
            <Route path='/bills' element={<Bills />} />
            <Route path='/customers' element={<Customers />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export const ProtectRouter = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}
export default App
