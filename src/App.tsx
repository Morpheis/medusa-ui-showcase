import { Routes, Route, Navigate } from 'react-router-dom'
import { OrderPage } from './pages/OrderPage'

export default function App() {
  return (
    <div className="min-h-screen bg-ui-bg-subtle">
      <Routes>
        <Route path="/empty" element={<OrderPage mode="empty" />} />
        <Route path="/populated" element={<OrderPage mode="populated" />} />
        <Route path="*" element={<Navigate to="/populated" replace />} />
      </Routes>
    </div>
  )
}
