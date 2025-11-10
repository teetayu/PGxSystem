import React, { useState, useEffect } from 'react'
import '../styles/userpage.css'
import Sidebar from '../components/Sidebar'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Patients() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState(null)

  const [patients, setPatients] = useState([
    { id: 'HN000011', name: 'นายเทส ทดสอบ', gender: 'ชาย', age: 21, ethnicity: 'ไทย', phone: '090-000-0000', physician: 'นพ.วิราพงษ์ ชื่นอ้อ', weight: 79, height: 178, status: 'รอยืนยันผล' },
    { id: 'HN000012', name: 'นางสาว กรองทอง', gender: 'หญิง', age: 34, ethnicity: 'ไทย', phone: '090-111-1111', physician: 'นพ.สมชาย ตัวอย่าง', weight: 60, height: 160, status: 'เสร็จสิ้น' },
    { id: 'HN000013', name: 'นายสมชาย ตัวอย่าง', gender: 'ชาย', age: 45, ethnicity: 'ไทย', phone: '090-222-2222', physician: 'นพ.อำนาจ แซ่ลิ้ม', weight: 72, height: 170, status: 'รอแก้ผล' },
  ])

  // Desired workflow states (user requested)
  const statuses = ['รอยืนยันผล', 'เสร็จสิ้น', 'รอแก้ผล', 'รอส่งตรวจ', 'อยู่ระหว่างตรวจ']

  // index of the row that currently has the status menu open (or null)
  const [statusMenuIndex, setStatusMenuIndex] = useState(null)

  const statusClass = (s) => {
    // map statuses to color classes (Tailwind utility classes via CDN)
    switch (s) {
      case 'เสร็จสิ้น':
        return 'bg-green-100 text-green-800'
      case 'รอแก้ผล':
        return 'bg-red-100 text-red-800'
      case 'รอส่งตรวจ':
        return 'bg-gray-100 text-gray-800'
      case 'อยู่ระหว่างตรวจ':
        return 'bg-yellow-100 text-yellow-800'
      case 'รอยืนยันผล':
      default:
        return 'bg-orange-100 text-orange-800'
    }
  }

  function openStatusMenu(index, e) {
    e.stopPropagation()
    setStatusMenuIndex(prev => (prev === index ? null : index))
  }

  function setStatus(index, newStatus, e) {
    e && e.stopPropagation()
    setPatients(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], status: newStatus }
      return copy
    })
    setStatusMenuIndex(null)
  }

  function onRowSelect(p) {
    setSelected(p)
  }

  // If navigated back from NewPatient with state containing newPatient, insert it
  useEffect(() => {
    if (location && location.state && location.state.newPatient) {
      const np = location.state.newPatient
      setPatients(prev => [np, ...prev])
      setSelected(np)
      // clear navigation state by replacing history entry
      navigate('/patients', { replace: true })
    }
  }, [location])

  return (
    <div className="page-patient">
      <Sidebar />

      <main className="main-content">
        <div className="header-row">
          <div>
            <h1 className="page-title">หน้ารวมผู้ป่วย</h1>
          </div>
          <div className="header-actions">
            <div className="user-actions">
              <button className="New-Patients">ข้อมูลผู้ใช้งาน</button>
              <button className="btn-secondary" style={{ marginLeft: 12 }} onClick={() => navigate('/patients/new')}>+ เพิ่มผู้ป่วยใหม่</button>
            </div>
          </div>
        </div>

        <div className="patients-layout">
          <section className="patients-list-panel">
            <div className="panel-title">รายการผู้ป่วย</div>
            <div className="search-row">
              <input className="search-input" placeholder="ค้นหาชื่อผู้ป่วย..." />
              <button className="btn-search">🔍</button>
            </div>

            <div className="patients-table">
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">NO.</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">ชื่อ-นามสกุล</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">HN</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">สถานะการตรวจ</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">แพทย์ประจำตัว</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((p, i) => (
                      <tr key={p.id} onClick={() => onRowSelect(p)} className={`${selected?.id === p.id ? 'bg-green-50' : ''} hover:bg-green-25`}>
                        <td className="px-3 py-3 text-sm text-gray-700">{i + 1}</td>
                        <td className="px-3 py-3 text-sm text-gray-900">{p.name}</td>
                        <td className="px-3 py-3 text-sm text-gray-700">{p.id}</td>
                        <td className="px-3 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-700">{p.physician}</td>
                        <td className="px-3 py-3 text-sm relative">
                          {/* Action: open a small menu to select workflow status */}
                          <button onClick={(e) => openStatusMenu(i, e)} className="px-3 py-1 rounded-md border border-gray-200 text-sm bg-white">
                            เปลี่ยนสถานะ ▾
                          </button>

                          {statusMenuIndex === i && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-10">
                              {statuses.map((s) => (
                                <div key={s} className="px-2 py-1 hover:bg-gray-50">
                                  <button className={`w-full text-left px-2 py-1 ${statusClass(s)}`} onClick={(e) => setStatus(i, s, e)}>{s}</button>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="patients-detail-panel">
            <div className="panel-title">ข้อมูลผู้ป่วยเบื้องต้น</div>
            {!selected && (
              <div className="empty-detail">เลือกผู้ป่วยจากตารางเพื่อดูข้อมูลพื้นฐาน</div>
            )}

            {selected && (
              <div className="patient-summary">
                <p><strong>ชื่อ-นามสกุล :</strong> <span className="muted">{selected.name}</span></p>
                <p><strong>HN :</strong> {selected.id}</p>
                <p><strong>เพศ :</strong> {selected.gender}</p>
                <p><strong>อายุ :</strong> {selected.age} ปี</p>
                <p><strong>แพทย์ประจำตัว :</strong> {selected.physician}</p>
                <p><strong>เบอร์ติดต่อ :</strong> {selected.phone}</p>
                <div style={{ marginTop: 12 }}>
                  <button className="btn-search" onClick={() => navigate(`/patients/${selected.id}`)}>รายละเอียดเพิ่มเติม</button>
                </div>
              </div>
            )}

            <div className="order-box">
              <div className="panel-title">ใบสั่งตรวจ</div>
              <div className="order-list">
                <table className="table small">
                  <thead>
                    <tr><th>รหัสการตรวจ</th><th>ชื่อการตรวจ</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>400094</td><td>Genomic DNA Extraction</td></tr>
                    <tr><td>410028</td><td>PGx for Acetaminophen (CYP2D6)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
