import { Suspense, lazy } from 'react'
import App from './App.jsx'

// Admin di-lazy load supaya kodenya tidak ikut ke bundle portfolio publik.
const Admin = lazy(() => import('./admin/Admin.jsx'))

const Root = () =>
  window.location.pathname.startsWith('/admin') ? (
    <Suspense fallback={null}>
      <Admin />
    </Suspense>
  ) : (
    <App />
  )

export default Root
