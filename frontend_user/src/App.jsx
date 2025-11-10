import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Reports from './pages/Reports'
import Order from './pages/Order'
import Knowledge from './pages/Knowledge'
import PatientsDetail from './pages/PatientsDetail'
import OrderResult from './pages/OrderResult'
// Temporarily show dashboard without auth during initial UI migration

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/patients" element={<Patients />} />
  <Route path="/patients/:id" element={<PatientsDetail />} />
  <Route path="/order-result/:code" element={<OrderResult />} />
  <Route path="/order" element={<Order />} />
  <Route path="/knowledge" element={<Knowledge />} />
  <Route path="/reports" element={<Reports />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
