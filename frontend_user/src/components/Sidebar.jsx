import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Bars3Icon,
  HomeIcon,
  UserGroupIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-top">
        <div className="brand flex items-center gap-2">
          <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            {collapsed ? <Bars3Icon className="w-6 h-6" /> : <ChevronDoubleLeftIcon className="w-6 h-6" />}
          </button>
          {!collapsed && <h1 className="text-lg font-bold">PGx System</h1>}
        </div>
      </div>

      <nav className="menu">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
          <HomeIcon className="w-5 h-5 icon" />
          {!collapsed && <span className="label">Dashboard</span>}
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
          <UserGroupIcon className="w-5 h-5 icon" />
          {!collapsed && <span className="label">หน้ารวมผู้ป่วย</span>}
        </NavLink>
        <NavLink to="/order" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
          <PencilSquareIcon className="w-5 h-5 icon" />
          {!collapsed && <span className="label">สั่งตรวจ</span>}
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
          <DocumentTextIcon className="w-5 h-5 icon" />
          {!collapsed && <span className="label">รายงานผล</span>}
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout flex items-center gap-2 px-3 py-2 rounded bg-red-600 text-white" onClick={signOut}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          {!collapsed && <span>ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  )
}
