import React from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/userpage.css'
import { useParams, useNavigate } from 'react-router-dom'

export default function PatientsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Static placeholder patient data — this should come from API in future
  const patient = {
    id,
    name: 'นายเทส ทดสอบ',
    gender: 'ชาย',
    age: 21,
    ethnicity: 'ไทย',
    phone: '090-000-0000',
    physician: 'นพ.วิราพงษ์ ชื่นอ้อ',
    weight: 79,
    height: 178,
    orders: [
      { code: '400094', name: 'Genomic DNA Extraction', specimen: 'BloodEDTA', date: '20/10/2025', status: 'รอผล' },
      { code: '410028', name: 'PGx for Acetaminophen (CYP2D6)', specimen: 'BloodEDTA', date: '20/10/2025', status: 'รอผล' },
    ],
  }

  return (
    <div className="page-patient">
      <Sidebar />

      <main className="main-content">
        <div className="flex items-center justify-between p-6">
          <h1 className="text-3xl font-extrabold">ผู้ป่วย</h1>
          <div>
            <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md mr-2" onClick={() => navigate(-1)}>ย้อนกลับ</button>
          </div>
        </div>

        <div className="px-6 pb-8">
          <div className="flex gap-6">
            {/* Left: big orders panel */}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-center font-bold text-lg mb-4">รายการตรวจ</div>
              <div className="h-[420px] overflow-auto bg-gray-50 rounded-md p-4 border border-gray-100">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left px-3 py-2">รหัสการตรวจ</th>
                      <th className="text-left px-3 py-2">ชื่อการตรวจ</th>
                      <th className="text-left px-3 py-2">สิ่งที่ส่งตรวจ</th>
                      <th className="px-3 py-2">วันที่</th>
                      <th className="px-3 py-2">สถานะ</th>
                      <th className="px-3 py-2">รายละเอียดผลตรวจ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.orders.map((o) => (
                      <tr key={o.code} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-3">{o.code}</td>
                        <td className="px-3 py-3 text-gray-700">
                          <button className="text-left text-blue-600 hover:underline" onClick={() => navigate(`/order-result/${o.code}`)}>{o.name}</button>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-600">{o.specimen}</td>
                        <td className="px-3 py-3">{o.date}</td>
                        <td className="px-3 py-3">
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">{o.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <button className="bg-gray-100 px-2 py-1 rounded-md" onClick={() => navigate(`/order-result/${o.code}`)}>รายละเอียดผลตรวจ</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: patient summary + order box */}
            <div className="w-96 flex flex-col gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="font-semibold mb-3">ข้อมูลผู้ป่วย</div>
                <div className="text-sm text-gray-700 space-y-2">
                  <div><span className="font-medium">ชื่อ-นามสกุล:</span> <span className="text-blue-600">{patient.name}</span></div>
                  <div><span className="font-medium">เลขประจำตัว (HN):</span> <span className="text-blue-600">{patient.id}</span></div>
                  <div><span className="font-medium">เพศ:</span> {patient.gender}</div>
                  <div><span className="font-medium">อายุ:</span> {patient.age} ปี</div>
                  <div><span className="font-medium">เชื้อชาติ:</span> {patient.ethnicity}</div>
                  <div><span className="font-medium">เบอร์ติดต่อ:</span> {patient.phone}</div>
                  <div><span className="font-medium">แพทย์ (Physician):</span> <span className="text-blue-600">{patient.physician}</span></div>
                  <div className="mt-2"><span className="font-medium">น้ำหนัก:</span> {patient.weight} กิโลกรัม <span className="ml-4 font-medium">ส่วนสูง:</span> {patient.height} เซนติเมตร</div>
                </div>
                <div className="mt-4">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md">รายละเอียดเพิ่มเติม</button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="font-semibold mb-3">ใบสั่งตรวจ</div>
                <div className="bg-gray-50 p-3 rounded">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr><th className="text-left px-2 py-2">รหัสการตรวจ</th><th className="text-left px-2 py-2">ชื่อการตรวจ</th></tr>
                    </thead>
                    <tbody>
                      {patient.orders.map(o => (
                        <tr key={o.code} className="border-t border-gray-100"><td className="px-2 py-2">{o.code}</td><td className="px-2 py-2">{o.name}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
