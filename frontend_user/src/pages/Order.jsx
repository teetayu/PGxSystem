import React from 'react'
import '../styles/userpage.css'
import Sidebar from '../components/Sidebar'

export default function Order() {
  return (
    <div className="page-patient">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <p>สั่งตรวจ</p>
          <div className="box-right">
            <div className="divider" />
            <div className="icon-link user-img" />
            <button className="New-Patients">ชื่อผู้ใช้งาน</button>
          </div>
        </header>

        <section className="patient-box">
          <div className="order-patient">
            <div className="patient">
              <div className="form-title">ข้อมูลผู้ป่วย</div>
              <div id="patient-info" className="patient-info">
                <p><strong>ชื่อ-นามสกุล (Name):</strong> <span id="patient-name">—</span></p>
                <p><strong>เลขประจำตัว (HN):</strong> <span id="patient-hn">—</span></p>
                <p><strong>แพทย์ (Physician):</strong> <span id="patient-doctor">—</span></p>
              </div>
            </div>

            <div className="row-container">
              <div className="row1">
                <div className="form-field1">
                  <div className="form-label">เหตุผลที่สั่งตรวจ :</div>
                  <div className="input"><input className="input1" type="text" placeholder="ระบุเหตุผลการสั่งตรวจ" /></div>
                </div>

                <div className="column">
                  <div className="form-field2">
                    <div className="form-label">ยาที่ผู้ป่วยได้รับในปัจจุบัน</div>
                    <div className="input"><input className="input2" type="text" placeholder="ระบุยาที่ผู้ป่วยได้รับ" /></div>
                  </div>
                  <div className="form-field2">
                    <div className="form-label">โปรดระบุชนิดของยาที่จะใช้ในการรักษา :</div>
                    <div className="input"><input className="input3" type="text" placeholder="ระบุยาที่จะใช้ในการรักษา" /></div>
                  </div>
                </div>

                <div className="check-page">
                  <div className="sel-title">เลือกรายการตรวจวินิจฉัย :</div>
                  <div className="check-box">
                    <div className="test-tabs">
                      <button className="tab-btn active">SNP genotyping test</button>
                      <button className="tab-btn">HLA/Drug-related SCAR screening test</button>
                      <button className="tab-btn">Functional genomics test</button>
                      <button className="tab-btn">Drug/Gene-related toxicity test</button>
                    </div>
                    <hr />
                    <div className="check-grid">
                      <div className="checklist">
                        <div className="tab-panel" style={{ display: 'block' }}>
                          <label className="chk"><input type="checkbox" defaultChecked /> Genomic DNA Extraction</label>
                          <label className="chk"><input type="checkbox" /> PGx for UGT1A1</label>
                          <label className="chk"><input type="checkbox" /> PGx for DPYD</label>
                        </div>
                      </div>
                      <div className="checklist">
                        <div className="tab-panel" />
                      </div>
                      <div className="checklist">
                        <div className="tab-panel" />
                      </div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-secondary">บันทึกการส่งตรวจ</button>
                  </div>
                </div>
              </div>

              <div className="row2">
                <div className="selected-tests">
                  <div className="panel-title">รายการตรวจวินิจฉัย :</div>
                  <div className="selected-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ width: 140 }}>รหัสการตรวจ</th>
                          <th>ชื่อการตรวจ</th>
                        </tr>
                      </thead>
                      <tbody id="selected-tests-body">
                        <tr><td>—</td><td>ยังไม่มีรายการ</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
