import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './routes/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { lazy, Suspense } from 'react'


const LoginPage = lazy(() => import('@pages').then(module => ({ default: module.LoginPage })))
const NotFoundPage = lazy(() => import('@pages').then(module => ({ default: module.NotFoundPage })))
const CategoriesPage = lazy(() => import('@pages').then(module => ({ default: module.CategoriesPage })))
const DetailPage = lazy(() => import('@pages').then(module => ({ default: module.DetailPage })))


export default function App() {

  return (
    <>
      <AuthContextProvider>
        <ErrorBoundary>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Navbar/>
            <Routes>
              <Route path="/signin" element={<LoginPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:name" element={<DetailPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthContextProvider>
    </>
  )
}
