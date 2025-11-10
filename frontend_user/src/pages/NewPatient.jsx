import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/userpage.css'
import { useNavigate } from 'react-router-dom'

export default function NewPatient() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    id: '',
    age: '',
    gender: 'ชาย',
    physician: '',
    phone: '',
  })

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    // create a simple HN if not provided
    const hn = form.id && form.id.trim() !== '' ? form.id : `HN${Date.now().toString().slice(-6)}`
    const newPatient = {
      id: hn,
      name: form.name || 'ไม่ระบุ',
      gender: form.gender,
      age: form.age || '',
      phone: form.phone || '',
      physician: form.physician || '',
      status: 'รอยืนยันผล',
    }

    // navigate back to patients with state carrying the new patient
    navigate('/patients', { state: { newPatient } })
  }

  return (
    <div className="page-patient">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 24 }}>
          <h1 className="page-title">กรอกข้อมูลผู้ป่วยใหม่</h1>

          <div className="patient-box" style={{ marginTop: 18 }}>
            <form onSubmit={onSubmit} style={{ padding: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div>
                  <label className="form-label">ชื่อ-นามสกุล (Name)</label>
                  <input name="name" value={form.name} onChange={onChange} className="input1" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">อายุ (Age)</label>
                  <input name="age" value={form.age} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">เพศ (Gender)</label>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                    <label><input type="radio" name="gender" value="ชาย" checked={form.gender === 'ชาย'} onChange={onChange} /> ชาย</label>
                    <label><input type="radio" name="gender" value="หญิง" checked={form.gender === 'หญิง'} onChange={onChange} /> หญิง</label>
                  </div>
                </div>

                <div>
                  <label className="form-label">เลขประจำตัวประชาชน (ID Number)</label>
                  <input name="idNumber" value={form.idNumber || ''} onChange={onChange} className="input1" style={{ width: '100%' }} placeholder="เลขประจำตัวประชาชน 13 หลัก" />
                </div>

                <div>
                  <label className="form-label">เชื้อชาติ (Ethnicity)</label>
                  <select name="ethnicity" value={form.ethnicity || ''} onChange={onChange} style={{ width: '100%', height: 36 }}>
                    <option value="">-- เลือก --</option>
                    <option value="ไทย">ไทย</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">เบอร์ติดต่อ (Phone/Fax)</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">แพทย์ (Physician)</label>
                  <input name="physician" value={form.physician} onChange={onChange} className="input1" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">หน่วยงานที่ส่งตรวจ (Hospital)</label>
                  <input name="hospital" value={form.hospital || ''} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">เลขประจำตัว (HN)</label>
                  <input name="id" value={form.id} onChange={onChange} className="input1" style={{ width: '100%' }} placeholder="เว้นว่างเพื่อสร้างอัตโนมัติ" />
                </div>

                <div>
                  <label className="form-label">วันที่รับตรวจ (Requestes Date)</label>
                  <input type="date" name="requestDate" value={form.requestDate || ''} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">วันที่รายงาน (Reported Date)</label>
                  <input type="date" name="reportedDate" value={form.reportedDate || ''} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">น้ำหนัก (kg)</label>
                  <input name="weight" value={form.weight || ''} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div>
                  <label className="form-label">ส่วนสูง (cm)</label>
                  <input name="height" value={form.height || ''} onChange={onChange} className="input2" style={{ width: '100%' }} />
                </div>

                <div style={{ gridColumn: '1 / span 3' }}>
                  <label className="form-label">หมายเหตุ</label>
                  <textarea name="notes" value={form.notes || ''} onChange={onChange} style={{ width: '100%', height: 84, padding: 8 }} />
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => navigate('/patients')}>ยกเลิก</button>
                <button type="submit" className="btn-secondary" style={{ background: 'linear-gradient(to right,#1dbf3a,#0b6d2a)' }}>บันทึกข้อมูล</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
