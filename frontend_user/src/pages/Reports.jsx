import React from 'react'
import '../styles/userpage.css'
import Sidebar from '../components/Sidebar'

export default function Reports() {
  return (
    <div className="page-patient">
      <Sidebar />
      <main className="main-content" style={{ padding: 24 }}>
        <header className="header">
          <p>รายงานผล</p>
        </header>
        <section style={{ padding: 24 }}>
          <h3>Reports / รายงาน</h3>
          <p>หน้า placeholder สำหรับรายงานผล (convert จาก legacy `รายงานผล` หน้าแยกได้)</p>
        </section>
      </main>
    </div>
  )
}
