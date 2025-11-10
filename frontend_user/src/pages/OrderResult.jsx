import React from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/userpage.css'
import { useParams, useNavigate } from 'react-router-dom'

export default function OrderResult() {
  const { code } = useParams()
  const navigate = useNavigate()

  // Static placeholder data for the selected order result
  const order = {
    code,
    testCode: '410028',
    testName: 'PGx for Acetaminophen (CYP2D6)',
    specimen: 'BloodEDTA',
    gene: 'CYP2D6',
    genotype: ['CYP2C9*2 (430C>T)', 'CYP2C9*3 (1075A>C)'],
    predictedGenotype: '',
    predictedPhenotype: '',
    recommendation: '',
  }

  return (
    <div className="page-patient">
      <Sidebar />

      <main className="main-content">
        <div className="p-6">
          <div className="bg-white rounded-lg border-4 border-blue-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="px-3 py-1 rounded border bg-white">
                  กลับ
                </button>
                <div className="text-xl font-extrabold">รายละเอียดผลตรวจ</div>
              </div>
            </div>

            <div className="bg-white border rounded p-4">
              <div className="mb-4">
                <div className="font-bold text-lg">หมายเลขใบสั่งตรวจ : {order.code}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">ชื่อ-นามสกุล (Name) :</label>
                    <input className="border rounded px-2 py-1 flex-1" defaultValue="นายเทส ทดสอบ" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">รหัสการตรวจ :</label>
                    <input className="border rounded px-2 py-1 w-40" defaultValue={order.testCode} />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">ชื่อการตรวจ :</label>
                    <input className="border rounded px-2 py-1 flex-1" defaultValue={order.testName} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">เลขประจำตัว (HN) :</label>
                    <input className="border rounded px-2 py-1 w-40" defaultValue="HN00001" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">สิ่งที่ส่งตรวจ :</label>
                    <input className="border rounded px-2 py-1 w-40" defaultValue={order.specimen} />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-48 font-semibold">ยาที่ผู้ป่วยได้รับในปัจจุบัน :</label>
                    <input className="border rounded px-2 py-1 flex-1" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-2 font-semibold">Genotype :</div>
                <div className="space-y-2">
                  {order.genotype.map((g, idx) => (
                    <div key={idx} className="border-b pb-1">{g}</div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-semibold">Predicted Genotype :</div>
                    <textarea className="w-full h-12 border rounded mt-2" />
                  </div>
                  <div>
                    <div className="font-semibold">Predicted Phenotype :</div>
                    <textarea className="w-full h-12 border rounded mt-2" />
                  </div>
                  <div>
                    <div className="font-semibold">Therapeutic recommendation :</div>
                    <textarea className="w-full h-28 border rounded mt-2" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="bg-green-700 text-white px-4 py-2 rounded">พิมพ์ใบผลการตรวจ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
