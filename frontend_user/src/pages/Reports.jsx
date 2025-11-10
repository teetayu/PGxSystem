import React, { useEffect, useState } from 'react'
import '../styles/userpage.css'
import '../styles/medicaltech-report.css'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'

export default function Reports() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({ username: '', dateStart: '', dateEnd: '', position: '', level: '', action: '', pageName: '' })

  useEffect(() => {
    // mock data until backend wired
    const reportData = [
      { no: 1, fullName: 'นายเทส ทดสอบ', hn: 'HN000011', status: 'รอดำเนินการ', genotype: 'CYP2C9' },
      { no: 2, fullName: 'นางสาวตัวอย่าง คงดี', hn: 'HN000012', status: 'เสร็จสิ้น', genotype: 'VKORC1' },
      { no: 3, fullName: 'นพ. แพทย์ ตัวอย่าง', hn: 'HN000013', status: 'รอดำเนินการ', genotype: 'CYP2D6' }
    ]
    setData(reportData)
  }, [])

  function handleSearch() {
    // placeholder: would call backend with filters
    console.log('search', filters)
  }

  function handleClear() {
    setFilters({ username: '', dateStart: '', dateEnd: '', position: '', level: '', action: '', pageName: '' })
  }

  function editRow(no) {
    // navigate to patient edit/detail (mocked)
    navigate(`/patients/${no}`)
  }

  function viewResult(no) {
    // navigate to order/result page
    navigate(`/order-result/${no}`)
  }

  return (
    <div className="page-patient">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <p>รายงานผล</p>
          <div className="box-right">
            <div className="divider" />
            <div className="icon-link user-img" />
            <button className="New-Patients">เทคนิค นายหนึ่ง</button>
          </div>
        </header>

        <div className="content-box-one">
          <div className="box-left">
            <div className="column1">
              <div className="username-group">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input type="text" id="username" placeholder="Value" value={filters.username} onChange={(e) => setFilters({ ...filters, username: e.target.value })} />
              </div>
              <div className="date-range-group">
                <label htmlFor="date-start">วันที่</label>
                <select id="date-start" value={filters.dateStart} onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}>
                  <option value="">ทุกวัน</option>
                  <option value="today">วันนี้</option>
                </select>
                <label className="label-mid">ถึง</label>
                <select id="date-end" value={filters.dateEnd} onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}>
                  <option value="">-----</option>
                  <option value="tomorrow">พรุ่งนี้</option>
                </select>
              </div>
            </div>

            <div className="column2">
              <div className="position-group">
                <label htmlFor="position">ตำแหน่ง</label>
                <select id="position" value={filters.position} onChange={(e) => setFilters({ ...filters, position: e.target.value })}>
                  <option value="">ทั้งหมด</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="time-range-group">
                <label htmlFor="time-start">ช่วงเวลา</label>
                <select id="time-start" value={filters.timeStart} onChange={(e) => setFilters({ ...filters, timeStart: e.target.value })}>
                  <option value="">ทุกวัน</option>
                  <option value="now">ตอนนี้</option>
                </select>
              </div>
            </div>

            <div className="column3">
              <div className="level-group">
                <label htmlFor="level">ระดับ</label>
                <select id="level" value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })}>
                  <option value="">ทั้งหมด</option>
                </select>
              </div>
              <div className="to-time">
                <label className="label-mid">ถึง</label>
                <select id="time-end" value={filters.timeEnd} onChange={(e) => setFilters({ ...filters, timeEnd: e.target.value })}>
                  <option value="">ทุกวัน</option>
                  <option value="later">ทีหลัง</option>
                </select>
              </div>
            </div>

            <div className="column4">
              <div className="action-group">
                <label htmlFor="action">การทำงานของผู้ใช้</label>
                <select id="action" value={filters.action} onChange={(e) => setFilters({ ...filters, action: e.target.value })}>
                  <option value="">ทั้งหมด</option>
                </select>
              </div>
              <div className="page-name-group">
                <label htmlFor="page-name">ชื่อหน้า</label>
                <select id="page-name" value={filters.pageName} onChange={(e) => setFilters({ ...filters, pageName: e.target.value })}>
                  <option value="">ทั้งหมด</option>
                </select>
              </div>
            </div>
          </div>

          <div className="box-right2">
            <button className="search-button" onClick={handleSearch}>ค้นหา</button>
            <button className="clear-button" onClick={handleClear}>ล้างคำค้นหาทั้งหมด</button>
          </div>
        </div>

        <section className="report-section">
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>เลขประจำตัว(HN)</th>
                  <th>สถานะการตรวจ</th>
                  <th>Genotype</th>
                  <th>จัดการผลตรวจ</th>
                  <th>ดูผลตรวจ</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.no}>
                    <td style={{ textAlign: 'center' }}>{item.no}</td>
                    <td style={{ textAlign: 'center' }}>{item.fullName}</td>
                    <td style={{ textAlign: 'center' }}>{item.hn}</td>
                    <td style={{ textAlign: 'center' }}><span className="badge">{item.status}</span></td>
                    <td style={{ textAlign: 'center' }}>{item.genotype}</td>
                    <td style={{ textAlign: 'center' }}><button className="muted-btn" onClick={() => editRow(item.no)}>แก้ไข</button></td>
                    <td style={{ textAlign: 'center' }}><button className="select-btn" onClick={() => viewResult(item.no)}>เลือก</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
