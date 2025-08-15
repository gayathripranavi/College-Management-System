import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './admin/scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './admin/scss/examples.scss'
//import Dashboard from './views/dashboard/Dashboard'
//import AddCourses from './views/courses/addCourses/AddCourses'

// Containers
const DefaultLayout = React.lazy(() => import('./admin/layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./Login'))
const Register = React.lazy(() => import('./Register'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="*" name="Home" element={<DefaultLayout />} />
          
         
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
