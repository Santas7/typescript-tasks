import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './routes/PrivateRoute'
import ErrorBoundary from './common/ErrorBoundary/ErrorBoundary'
import { lazy, Suspense } from 'react'

const Login = lazy(() => import('./components/Login/Login'))
const Categories = lazy(() => import('./components/Categories/Categories'))
const Detail = lazy(() => import('./components/Categories/Detail/Detail'))


export default function App() {

  return (
    <>
      <AuthContextProvider>
        <ErrorBoundary>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Navbar/>
            <Routes>
              <Route path="/signin" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:name" element={<Detail />} />
              </Route>
              <Route path="*" element={<Login />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthContextProvider>
    </>
  )
}
