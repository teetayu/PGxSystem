import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'
import '../styles/userpage.css'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="page-patient">
      <Sidebar />

      <main className="main-content">
        <div className="header-row">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <div className="subtitle">Quick Access</div>
          </div>

          <div className="header-actions">
            <div className="search-area">
              <input className="search-input" placeholder="ค้นหา" />
              <button className="btn-search">ค้นหา</button>
            </div>

            <div className="user-actions">
              {user && <span className="user-email">{user.email}</span>}
              <button className="New-Patients" onClick={signOut}>ชื่อผู้ใช้งาน</button>
            </div>
          </div>
        </div>

        <section className="quick-access">
          <div className="stats-cards">
            <div className="stat-card stat-white">
              <div className="stat-number">243</div>
              <div className="stat-label">ผู้ตรวจทั้งหมด</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-number">120</div>
              <div className="stat-label">รอการยืนยันผลตรวจ</div>
            </div>
            <div className="stat-card stat-green">
              <div className="stat-number">122</div>
              <div className="stat-label">ยืนยันผลตรวจ</div>
            </div>
            <div className="stat-card stat-red">
              <div className="stat-number">1</div>
              <div className="stat-label">รอการแก้ไข</div>
            </div>
          </div>
        </section>

        <section className="main-panels">
          <div className="left-column">
            <div className="chart-panel">
              <div className="chart-title">สถิติการเพิ่มเข้าผู้ป่วยใหม่</div>
              <div className="chart-placeholder">(Chart placeholder)</div>
            </div>

            <div className="bottom-cards">
              <div className="small-card">สถิติการใช้งานรายวัน</div>
              <div className="small-card">อัตราการปฏิเสธส่งตรวจ</div>
            </div>
          </div>

          <aside className="right-column">
            <div className="side-box">
              <div className="side-box-title">รายการเคสรอยืนยันผล</div>
              <ul className="case-list">
                <li>HN000011 - CYP2C9 - 02/10/2568</li>
                <li>HN000012 - VKORC1 - 02/10/2568</li>
                <li>HN000013 - 2C19 - 02/10/2568</li>
              </ul>
            </div>

            <div className="side-box">
              <div className="side-box-title">รายการเคสเกินกำหนด</div>
              <ul className="case-list">
                <li>HN000010 - CYP2C9 (รอผลเกิน 24 ชม.)</li>
              </ul>
            </div>
          </aside>
        </section>

        <footer className="app-footer">
          <div className="footer-left">รองรับมาตรฐาน: ISO 15189:2022 • ISO/IEC 17025:2017</div>
          <div className="footer-right">
            <a className="knowledge-btn" href="/knowledge">Knowledge&Info</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
