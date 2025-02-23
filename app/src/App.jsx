import './App.css'
import Signin from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Categories from './components/Categories/Categories'
import Detail from './components/Categories/Detail/Detail'
import PrivateRoute from './routes/PrivateRoute'
import Login from './components/Login/Login'

export default function App() {

  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Detail />} />
          </Route>
          <Route path="*" element={<Signin />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}
