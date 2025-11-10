import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/userpage.css'
import { Link } from 'react-router-dom'

export default function Knowledge() {
  const [tab, setTab] = useState('service')

  return (
    <div className="page-patient">
      <Sidebar />

      <main className="main-content">
        <div className="header-row">
          <div>
            <h1 className="page-title">Knowledge&Info</h1>
          </div>

          <div className="header-actions">
            <div className="user-actions">
              <Link to="/dashboard" className="btn-search">ย้อนกลับ</Link>
            </div>
          </div>
        </div>

        <div className="knowledge-panel">
          <div className="knowledge-tabs">
            <button className={tab==='service' ? 'tab active' : 'tab'} onClick={() => setTab('service')}>ข้อมูลบริการตรวจ</button>
            <button className={tab==='rules' ? 'tab active' : 'tab'} onClick={() => setTab('rules')}>กฎการแปลผล</button>
            <button className={tab==='articles' ? 'tab active' : 'tab'} onClick={() => setTab('articles')}>บทความและงานวิจัย</button>
          </div>

          <div className="knowledge-content">
            {tab === 'service' && (
              <div className="download-list">
                <div className="download-row">ดาวน์โหลดใบสั่งตรวจ <button className="download-btn">⬇</button></div>
                <div className="download-row">TAT (SLA) ของแต่ละการตรวจ <button className="download-btn">⬇</button></div>
                <div className="download-row">ข้อปฏิบัติก่อนตรวจ, ชนิดการส่งตรวจ, ปริมาณ <button className="download-btn">⬇</button></div>
              </div>
            )}

            {tab === 'rules' && (
              <div className="download-list">
                <div className="download-row">กฎการแปลผล</div>
                <div className="download-row">ฐานข้อมูล genotype</div>
                <div className="download-row">รายการเตือนความเสี่ยง HLA-ยา</div>
                <div className="download-row">คำแนะนำการปรับขนาดยา</div>
              </div>
            )}

            {tab === 'articles' && (
              <div className="empty-articles">ยังไม่มีบทความ/วิจัย</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
